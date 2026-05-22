"use client";

import {
  buildCharPlans,
  buildTextPlans,
  deterministicScrambleMask,
  resolveScrambleFrame,
  type ScrambleCharPlan,
} from "@/lib/scramble-text";
import { portoEase } from "@/lib/motion";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

export type ScrambleOutline = false | "primary" | "muted" | "blue" | "accent";

type ScrambleTextProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  mode?: "line" | "words" | "chars";
  trigger?: "mount" | "scroll";
  delay?: number;
  once?: boolean;
  outlined?: ScrambleOutline;
  hoverDecode?: boolean;
  charStaggerMs?: number;
  wordGapMs?: number;
  durationMs?: number;
};

const outlineClass: Record<Exclude<ScrambleOutline, false>, string> = {
  primary: "text-outlined",
  muted: "text-outlined text-outlined-muted",
  blue: "text-outlined text-outlined-blue",
  accent: "text-outlined text-outlined-accent",
};

function runScramble(
  plans: ScrambleCharPlan[],
  fullText: string,
  onFrame: (value: string) => void,
  onDone: () => void,
) {
  let raf = 0;
  let tick = 0;
  const start = performance.now();
  const totalMs =
    Math.max(...plans.map((p) => p.startMs + p.durationMs), 0) + 100;

  const loop = (now: number) => {
    tick += 1;
    const elapsed = now - start;
    onFrame(resolveScrambleFrame(plans, elapsed, tick));
    if (elapsed < totalMs) {
      raf = requestAnimationFrame(loop);
    } else {
      onFrame(fullText);
      onDone();
    }
  };

  raf = requestAnimationFrame(loop);
  return () => cancelAnimationFrame(raf);
}

export function ScrambleText({
  text,
  className = "",
  as: Tag = "span",
  mode = "words",
  trigger = "scroll",
  delay = 0,
  once = true,
  outlined = false,
  hoverDecode = false,
  charStaggerMs = 42,
  wordGapMs = 140,
  durationMs = 520,
}: ScrambleTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = mounted && prefersReducedMotion;

  const inView = useInView(ref, { once, amount: 0.32 });
  const active =
    mounted && (reduceMotion || (trigger === "mount" ? true : inView));

  const plans = useMemo(() => {
    const base = delay * 1000;
    if (mode === "words") {
      return buildTextPlans(text, base, wordGapMs, charStaggerMs, durationMs);
    }
    const stagger = mode === "chars" ? charStaggerMs * 0.9 : charStaggerMs;
    return buildCharPlans(text, base, stagger, durationMs);
  }, [text, mode, delay, charStaggerMs, wordGapMs, durationMs]);

  const scrambleMask = useMemo(() => deterministicScrambleMask(text), [text]);
  const [display, setDisplay] = useState(text);
  const [done, setDone] = useState(false);
  const scrambleRanRef = useRef(false);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !active) return;
    if (once && scrambleRanRef.current) return;

    if (reduceMotion) {
      setDisplay(text);
      setDone(true);
      if (once) scrambleRanRef.current = true;
      return;
    }

    setDisplay(scrambleMask);
    setDone(false);
    return runScramble(plans, text, setDisplay, () => {
      setDone(true);
      if (once) scrambleRanRef.current = true;
    });
  }, [mounted, active, plans, text, reduceMotion, scrambleMask, once]);

  const hoverCleanupRef = useRef<(() => void) | null>(null);

  const replayHover = () => {
    if (!mounted || !hoverDecode || reduceMotion || !done) return;
    hoverCleanupRef.current?.();
    hoverCleanupRef.current = runScramble(
      buildCharPlans(text, 0, 30, 400),
      text,
      setDisplay,
      () => setDisplay(text),
    );
  };

  const endHover = () => {
    hoverCleanupRef.current?.();
    hoverCleanupRef.current = null;
    setDisplay(text);
  };

  const outlineCls = outlined ? outlineClass[outlined] : "";
  const interactiveCls =
    hoverDecode && outlined ? "text-outlined-interactive" : "";

  const hoverHandlers = hoverDecode
    ? {
        onMouseEnter: replayHover,
        onMouseLeave: endHover,
        onFocus: replayHover,
        onBlur: endHover,
      }
    : {};

  /* SSR + hydration: static markup only (no motion / random scramble). */
  if (!mounted) {
    return (
      <Tag
        ref={ref as never}
        className={`scramble-text ${outlineCls} ${interactiveCls} ${className}`}
        aria-label={text}
      >
        <span className="scramble-text-inner inline-block opacity-0" aria-hidden>
          {text}
        </span>
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref as never}
      className={`scramble-text ${outlineCls} ${interactiveCls} ${className}`}
      aria-label={text}
      {...hoverHandlers}
    >
      <motion.span
        className="scramble-text-inner inline-block"
        initial={
          trigger === "mount"
            ? { opacity: 0, y: 10, filter: "blur(8px)" }
            : { opacity: 1, y: 0, filter: "blur(0px)" }
        }
        animate={
          active
            ? {
                opacity: 1,
                y: 0,
                filter: done ? "blur(0px)" : "blur(2px)",
              }
            : trigger === "mount"
              ? { opacity: 0, y: 10, filter: "blur(8px)" }
              : { opacity: 1, y: 0, filter: "blur(0px)" }
        }
        transition={{ duration: 0.65, ease: portoEase }}
      >
        {display}
      </motion.span>
    </Tag>
  );
}
