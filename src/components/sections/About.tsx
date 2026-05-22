import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import Link from "next/link";

export function About() {
  return (
    <section
      id="about"
      className="border-t border-portoLine px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <SectionLabel index="02" tag="Who we are" eyebrow="Engineering" />
        </Reveal>
        <div className="mt-16 grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          <Reveal delay={0.05}>
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-portoLine bg-neutral-900">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url('/Cube.png')",
                }}
              />
            </div>
          </Reveal>
          <div className="space-y-8">
            <Reveal delay={0.08}>
              <h2 className="font-display text-porto-display-sm font-semibold uppercase text-[rgb(128,128,128)]">
                More About
              </h2>
              <h2 className="mt-2 font-display text-porto-display font-semibold lowercase text-white porto-lg:mt-1">
                jaxpat technology
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
              <Link
                href="/contact"
                className="inline-flex rounded-full border border-white/25 px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white shadow-porto transition duration-500 ease-porto hover:border-portoAccent/40 hover:bg-white/[0.08] hover:shadow-porto-hover"
              >
                Capability overview
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
