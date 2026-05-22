"use client";

import { HoverWords } from "@/components/motion/HoverWords";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { SectionLabel } from "@/components/SectionLabel";

export function About() {
  return (
    <section
      id="about"
      className="border-t border-portoLine porto-safe-x py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <SectionLabel index="02" tag="Who we are" eyebrow="Engineering" />
        </Reveal>
        <div className="mt-16 grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          <Reveal delay={0.05}>
            <ParallaxLayer distance={56}>
              <TiltCard intensity={7} className="[perspective:1200px]">
                <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-portoLine bg-neutral-900 transition duration-500 hover:border-portoAccent/30">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: "url('/Cube.png')",
                    }}
                  />
                </div>
              </TiltCard>
            </ParallaxLayer>
          </Reveal>
          <div className="space-y-8">
            <Reveal delay={0.08} variant="fadeUpBlur">
              <h2 className="font-display text-porto-display-sm font-semibold uppercase text-brand-secondary">
                <HoverWords as="span" byChar={false} text="More About" />
              </h2>
              <h2 className="mt-2 font-display text-porto-display font-semibold lowercase text-white porto-lg:mt-1">
                <HoverWords as="span" text="jaxpat technology" />
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="text-sm font-medium uppercase tracking-[0.12em] text-neutral-300">
                JAXPAT TECHNOLOGY IS A PRODUCT-BASED COMPANY DELIVERING
                2026-READY SOLUTIONS ACROSS WEB, MOBILE, AI, CLOUD, AND
                IMMERSIVE EXPERIENCES.
              </p>
              <p className="mt-4 text-sm font-medium uppercase tracking-[0.12em] text-neutral-400">
                FROM NEXT.JS AND THREE.JS WEBSITES TO ANDROID STUDIO + FLUTTER
                APPS, RAG WORKFLOWS, MONGODB ATLAS, SUPABASE, AND VR/AR—WE BUILD
                FOR RELIABILITY, SCALE, AND MEASURABLE OUTCOMES.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="porto-body porto-muted max-w-xl">
                Our engineers partner with product teams to architect, build, and
                operate end-to-end systems: full-stack apps, mobile clients,
                retrieval-backed AI assistants, and cloud databases that stay fast
                under real traffic. We prioritize clean handoffs, documentation,
                and maintainable code your team can confidently extend.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <MagneticButton
                href="/contact"
                className="px-6 py-3 text-xs tracking-[0.2em]"
              >
                Capability overview
              </MagneticButton>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
