"use client";

import { HoverWords } from "@/components/motion/HoverWords";
import { ProcessOrbit } from "@/components/motion/ProcessOrbit";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerItem, StaggerReveal } from "@/components/motion/StaggerReveal";

const STEPS = [
  "BRIEF",
  "UI",
  "API",
  "DATA",
  "AI",
  "SHIP",
] as const;

export function ShipProcess() {
  return (
    <section
      id="process"
      className="relative border-t border-portoLine porto-safe-x py-20 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(0,86,179,0.06),transparent)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1400px]">
        <Reveal variant="fade">
          <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-neutral-500">
            <span className="text-brand-accent">/ Process</span>
            <span className="text-neutral-600"> · The build loop</span>
          </p>
        </Reveal>

        <div className="mt-14 grid min-w-0 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(260px,420px)_minmax(0,1fr)] lg:gap-8">
          <Reveal delay={0.05} variant="slideRight" className="min-w-0 lg:justify-self-end">
            <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-neutral-500">
              how we ship
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.75rem,4vw,3.25rem)] font-semibold uppercase leading-[0.95] tracking-[-0.04em]">
              <HoverWords
                as="span"
                byChar
                text="brief → code → ship."
                className="font-display text-[clamp(1.75rem,4vw,3.25rem)] font-semibold uppercase leading-[0.95] tracking-[-0.04em]"
              />
            </h2>
            <p className="porto-body porto-muted mt-6 max-w-md text-sm leading-relaxed">
              Six steps, repeated for every product. Scroll the loop — each phase
              lights up as you move through discovery to deployment.
            </p>
          </Reveal>

          <Reveal delay={0.08} variant="scaleIn" className="min-w-0 flex justify-center">
            <ProcessOrbit />
          </Reveal>

          <Reveal delay={0.1} variant="slideLeft" className="min-w-0">
            <StaggerReveal className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-2">
              {STEPS.map((step, i) => (
                <StaggerItem
                  key={step}
                  className="group border-l border-portoLine pl-4 transition-colors hover:border-portoAccent/60"
                >
                  <span className="font-sans text-[10px] tabular-nums text-neutral-600 transition-colors group-hover:text-portoAccent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-1 font-display text-sm font-semibold uppercase tracking-wide text-neutral-300 transition-colors group-hover:text-white">
                    <HoverWords headingInteractive={false} text={step} />
                  </p>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
