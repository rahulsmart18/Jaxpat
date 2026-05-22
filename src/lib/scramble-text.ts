/** Symbols used during decode — readable noise, not harsh glitch */
export const SCRAMBLE_CHARSET = "@#$%&*!?^$#@%&*!^$#@";

export function randomScrambleChar(): string {
  return SCRAMBLE_CHARSET[Math.floor(Math.random() * SCRAMBLE_CHARSET.length)] ?? "#";
}

/** SSR-safe scramble preview — stable across server and client. */
export function deterministicScrambleMask(text: string): string {
  return [...text]
    .map((c, i) =>
      c === " " ? " " : (SCRAMBLE_CHARSET[i % SCRAMBLE_CHARSET.length] ?? "#"),
    )
    .join("");
}

/** Smooth deceleration — cinematic settle */
export function scrambleEase(t: number): number {
  return 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 4);
}

export type ScrambleCharPlan = {
  target: string;
  startMs: number;
  durationMs: number;
};

export function buildCharPlans(
  text: string,
  baseDelayMs: number,
  staggerMs: number,
  durationMs: number,
): ScrambleCharPlan[] {
  return [...text].map((char, i) => ({
    target: char,
    startMs: baseDelayMs + i * staggerMs,
    durationMs: char === " " ? Math.min(durationMs, 120) : durationMs + (i % 3) * 40,
  }));
}

/** Word-by-word decode preserving spaces and punctuation */
export function buildTextPlans(
  text: string,
  baseDelayMs: number,
  wordGapMs: number,
  charStaggerMs: number,
  durationMs: number,
): ScrambleCharPlan[] {
  const plans: ScrambleCharPlan[] = [];
  let offset = baseDelayMs;
  const tokens = text.split(/(\s+)/).filter((t) => t.length > 0);

  tokens.forEach((token, ti) => {
    const isSpace = /^\s+$/.test(token);
    if (isSpace) {
      for (const char of token) {
        plans.push({ target: char, startMs: offset, durationMs: 80 });
        offset += 24;
      }
      return;
    }

    for (let i = 0; i < token.length; i++) {
      plans.push({
        target: token[i]!,
        startMs: offset + i * charStaggerMs,
        durationMs: durationMs + (i % 3) * 35,
      });
    }
    offset += token.length * charStaggerMs + durationMs * 0.38;
    if (ti < tokens.length - 1 && !/^\s+$/.test(tokens[ti + 1] ?? "")) {
      offset += wordGapMs;
    }
  });

  return plans;
}

export function resolveScrambleFrame(
  plans: ScrambleCharPlan[],
  elapsedMs: number,
  tick: number,
): string {
  return plans
    .map((plan) => {
      if (plan.target === " ") return " ";
      if (elapsedMs < plan.startMs) {
        return randomScrambleChar();
      }
      const t = (elapsedMs - plan.startMs) / plan.durationMs;
      const eased = scrambleEase(t);
      if (eased >= 0.98) return plan.target;
      const scrambleRate = 1 - eased;
      if ((tick * 0.13 + plan.startMs * 0.01) % 1 < scrambleRate * 0.55) {
        return randomScrambleChar();
      }
      return plan.target;
    })
    .join("");
}
