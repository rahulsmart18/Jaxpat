"use client";

import { HoverWords } from "@/components/motion/HoverWords";
import { ProcessOrbit } from "@/components/motion/ProcessOrbit";
import { Reveal } from "@/components/motion/Reveal";
import { portoEase } from "@/lib/motion";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { useRef, useState } from "react";

const STEPS = [
  "BRIEF",
  "UI",
  "API",
  "DATA",
  "AI",
  "SHIP",
] as const;

const STEP_CONTENT: ReadonlyArray<{ title: string; description: string }> = [
  {
    title: "Brief",
    description:
      "Align scope, audience, and outcomes. We map the problem space, sharpen the success metric, and agree on what we are not building.",
  },
  {
    title: "UI",
    description:
      "Design system, motion, and accessibility from day one. Style is a feature — every screen ships with intent, hierarchy, and rhythm.",
  },
  {
    title: "API",
    description:
      "Typed contracts, edge-ready endpoints, and predictable failure modes. Boring infrastructure so the product surface can be exciting.",
  },
  {
    title: "Data",
    description:
      "Schemas you can evolve, pipelines you can debug, and telemetry baked in from the first commit. Decisions backed by signal, not vibes.",
  },
  {
    title: "AI",
    description:
      "Models in the loop where they earn their keep — retrieval, reasoning, and human-in-the-loop fallbacks where they don't.",
  },
  {
    title: "Ship",
    description:
      "Continuous deploys, observability, and a feedback loop that closes within the hour. We do not consider it shipped until users feel it.",
  },
];

export function ShipProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 32,
    mass: 0.28,
  });

  useMotionValueEvent(smoothProgress, "change", (v) => {
    const clamped = Math.max(0, Math.min(0.9999, v));
    setActiveIndex(Math.floor(clamped * STEPS.length));
  });

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative border-t border-portoLine"
      style={{ height: `${STEPS.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden porto-safe-x">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(0,86,179,0.06),transparent)]"
          aria-hidden
        />

        <div className="relative mx-auto w-full max-w-[1400px]">
          <Reveal variant="fade">
            <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-neutral-500">
              <span className="text-brand-accent">/ Process</span>
              <span className="text-neutral-600"> · The build loop</span>
            </p>
          </Reveal>

          <div className="mt-10 grid min-w-0 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(260px,420px)_minmax(0,1fr)] lg:gap-8">
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
              <div
                className="mt-8 max-w-md"
                style={{ perspective: 900 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, rotateX: -75, y: 18 }}
                    animate={{ opacity: 1, rotateX: 0, y: 0 }}
                    exit={{ opacity: 0, rotateX: 65, y: -18 }}
                    transition={{ duration: 0.5, ease: portoEase }}
                    style={{
                      transformOrigin: "center top",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-portoAccent">
                      Step {String(activeIndex + 1).padStart(2, "0")}
                      <span className="ml-3 text-neutral-600">
                        / of {String(STEPS.length).padStart(2, "0")}
                      </span>
                    </p>
                    <h3 className="mt-3 font-display text-2xl font-semibold uppercase tracking-[-0.02em] text-white md:text-3xl">
                      <HoverWords
                        as="span"
                        headingInteractive
                        text={STEP_CONTENT[activeIndex].title}
                      />
                    </h3>
                    <p className="porto-body porto-muted mt-4 text-sm leading-relaxed">
                      {STEP_CONTENT[activeIndex].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </Reveal>

            <Reveal delay={0.08} variant="scaleIn" className="min-w-0 flex justify-center">
              <ProcessOrbit progress={smoothProgress} activeIndex={activeIndex} />
            </Reveal>

            <Reveal delay={0.1} variant="slideLeft" className="min-w-0">
              <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-2">
                {STEPS.map((step, i) => {
                  const isActive = activeIndex === i;
                  return (
                    <li
                      key={step}
                      className={`group border-l pl-4 transition-colors ${
                        isActive
                          ? "border-portoAccent"
                          : "border-portoLine hover:border-portoAccent/60"
                      }`}
                    >
                      <span
                        className={`font-sans text-[10px] tabular-nums transition-colors ${
                          isActive ? "text-portoAccent" : "text-neutral-600 group-hover:text-portoAccent"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p
                        className={`mt-1 font-display text-sm font-semibold uppercase tracking-wide transition-colors ${
                          isActive ? "text-white" : "text-neutral-300 group-hover:text-white"
                        }`}
                      >
                        <HoverWords headingInteractive={false} text={step} />
                      </p>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
