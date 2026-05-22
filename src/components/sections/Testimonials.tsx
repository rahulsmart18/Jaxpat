"use client";

import { testimonials } from "@/lib/data";
import { HoverWords } from "@/components/motion/HoverWords";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () =>
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="border-t border-portoLine porto-safe-x py-20 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <SectionLabel index="11" tag="Testimonial" eyebrow="Voices" />
        </Reveal>
        <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal delay={0.05}>
            <div>
              <h2 className="font-display text-porto-display-sm font-semibold uppercase text-brand-secondary">
                <HoverWords as="span" byChar={false} text="Trusted by" />
              </h2>
              <h2 className="mt-2 font-display text-porto-display font-semibold uppercase text-white porto-lg:mt-1">
                <HoverWords as="span" byChar={false} text="Product & platform teams" />
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-3">
              <MagneticButton
                type="button"
                variant="ghost"
                size="sm"
                onClick={prev}
                className="text-neutral-400"
              >
                Back
              </MagneticButton>
              <MagneticButton
                type="button"
                variant="ghost"
                size="sm"
                onClick={next}
                className="text-neutral-400"
              >
                Next
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        <div className="relative mt-14 min-h-[260px] overflow-hidden border border-portoLine bg-white/[0.02] p-5 sm:min-h-[300px] sm:p-8 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.name}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-10 md:grid-cols-[160px_1fr] md:items-start"
            >
              <div className="relative mx-auto aspect-square w-32 overflow-hidden rounded-full border border-white/10 md:mx-0 md:w-40">
                <Image src={t.image} alt="" fill className="object-cover" />
              </div>
              <div>
                <p className="font-display text-2xl text-white">{t.name}</p>
                <p className="mt-2 font-sans text-xs text-neutral-500">{t.role}</p>
                <p className="porto-body mt-8 text-white">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
