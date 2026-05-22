"use client";

import { faqItems } from "@/lib/data";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-t border-portoLine px-4 py-20 sm:px-6 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <SectionLabel index="12" tag="FAQ" eyebrow="Concerns" />
        </Reveal>
        <div className="mt-12">
          <Reveal delay={0.05}>
            <h2 className="font-display text-porto-display-sm font-semibold uppercase text-white">
              Frequently
            </h2>
            <h2 className="mt-2 font-display text-porto-display font-semibold uppercase text-[rgb(128,128,128)] porto-lg:mt-1">
              Asked Questions
            </h2>
          </Reveal>
          <div className="mt-14 border-y border-portoLine">
            {faqItems.map((item, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={item.q}
                  className="border-b border-portoLine last:border-b-0"
                >
                  <Reveal delay={0.04 * i}>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex min-h-[56px] w-full touch-manipulation items-start justify-between gap-4 py-6 text-left sm:gap-6 sm:py-8 md:min-h-0"
                    >
                      <span className="font-sans text-[11px] text-neutral-600">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 font-display text-lg leading-snug text-white sm:text-xl md:text-2xl">
                        {item.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        className="text-neutral-500"
                      >
                        +
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="porto-body porto-muted pb-8 pl-12 pr-2 leading-relaxed sm:pl-14 md:pl-20 md:pr-0">
                            {item.a}
                          </p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
