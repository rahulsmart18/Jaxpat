"use client";

import { stackTools } from "@/lib/data";
import { HoverWords } from "@/components/motion/HoverWords";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function Bar({ value }: { value: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <div ref={ref} className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
      <motion.div
        className="h-full rounded-full bg-white/80"
        initial={{ width: 0 }}
        animate={inView ? { width: `${value}%` } : undefined}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

export function StackTools() {
  return (
    <section
      id="stack"
      className="border-t border-portoLine porto-safe-x py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <SectionLabel index="10" tag="Jaxpat" eyebrow="Stack & tools" />
        </Reveal>
        <div className="mt-12">
          <Reveal delay={0.05}>
            <h2 className="font-display text-porto-display font-semibold tracking-tight text-white">
              <HoverWords as="span" byChar={false} text="Stack & Tools" />
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-2">
            {stackTools.map((tool, i) => (
              <Reveal key={tool.name} delay={0.06 * i}>
                <div className="porto-interactive border border-portoLine bg-white/[0.02] p-5 sm:p-8">
                  <div className="flex min-w-0 items-baseline justify-between gap-3 sm:gap-4">
                    <div className="min-w-0">
                      <h3 className="font-display text-xl text-white sm:text-2xl">
                        {tool.name}
                      </h3>
                      <p className="mt-1 font-sans text-xs text-neutral-500">
                        {tool.role}
                      </p>
                    </div>
                    <span className="shrink-0 font-display text-2xl text-white sm:text-3xl">
                      {`${tool.value}%`}
                    </span>
                  </div>
                  <Bar value={tool.value} />
                  <p className="porto-body porto-muted mt-6">
                    {tool.blurb}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
