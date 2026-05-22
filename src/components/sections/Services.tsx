"use client";

import { useState } from "react";
import { services } from "@/lib/data";
import { HoverWords } from "@/components/motion/HoverWords";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";

function ServiceDots({
  rowIndex,
  total,
}: {
  rowIndex: number;
  total: number;
}) {
  return (
    <div
      className="flex min-w-0 shrink-0 flex-nowrap justify-start gap-2"
      aria-hidden
    >
      {Array.from({ length: total }, (_, dotIdx) => (
        <span
          key={dotIdx}
          className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
            dotIdx <= rowIndex ? "bg-white" : "bg-neutral-700"
          }`}
        />
      ))}
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={`h-3.5 w-3.5 shrink-0 text-white/90 transition-transform duration-300 ease-porto md:h-4 md:w-4 ${
        open ? "rotate-180" : ""
      }`}
      aria-hidden
    >
      <path
        d="M2 4l4 4 4-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="border-t border-portoLine porto-safe-x-loose py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-[1600px]">
        <Reveal>
          <div className="flex flex-col items-center gap-3 border-b border-portoLine pb-8 text-center text-[10px] font-medium uppercase tracking-[0.32em] text-neutral-500 sm:flex-row sm:justify-center sm:gap-x-12 sm:text-[11px] sm:tracking-[0.35em]">
            <span className="font-sans tabular-nums text-neutral-600">04</span>
            <span className="font-sans text-neutral-400">
              <span className="text-portoAccent">{"//"}</span> services
            </span>
            <span className="font-sans text-white/90">Fast delivery</span>
          </div>
        </Reveal>

        <div className="mt-3 w-full border border-portoLine">
          <Reveal delay={0.05}>
            <div className="border-b border-portoLine px-4 py-12 text-center sm:px-6 md:px-12 md:py-16 lg:px-16">
              <h2 className="font-display text-porto-display-sm font-semibold uppercase text-brand-secondary">
                <HoverWords as="span" byChar={false} text="Pro" />
              </h2>
              <h2 className="mt-3 font-display text-porto-display font-semibold uppercase leading-[0.85] text-white md:mt-2">
                <HoverWords as="span" byChar={false} text="Services" />
              </h2>
              <p className="porto-body mx-auto mt-8 max-w-2xl text-pretty leading-relaxed text-white/90 md:mt-10">
                Discover our range of services designed to elevate your brand to
                the next level.
              </p>
            </div>
          </Reveal>

          <ul className="divide-y divide-portoLine">
            {services.map((s, i) => {
              const open = openIndex === i;

              return (
                <li key={s.title}>
                  <Reveal delay={0.04 * i}>
                    <div>
                      <MagneticButton
                        type="button"
                        variant="minimal"
                        shape="rect"
                        justifyInner="between"
                        onClick={() =>
                          setOpenIndex((prev) => (prev === i ? null : i))
                        }
                        className="relative w-full min-h-0 rounded-none border-0 bg-transparent px-4 py-9 text-left shadow-none transition-colors duration-300 hover:bg-white/[0.035] sm:px-8 sm:py-11 md:px-12 md:py-12 lg:px-16 lg:py-14"
                        aria-expanded={open}
                      >
                        <span className="flex w-full max-w-full items-center justify-between gap-4 phone:gap-6 md:gap-10 lg:gap-12">
                          {/* Left: dots + title + tagline */}
                          <span className="flex min-w-0 flex-1 flex-col items-start gap-3 text-left md:gap-3.5">
                            <ServiceDots rowIndex={i} total={services.length} />
                            <span className="font-display text-base font-semibold uppercase leading-snug tracking-wide text-white md:text-lg lg:text-xl">
                              {s.title}
                            </span>
                            <span className="max-w-2xl font-jaxpat text-[10px] font-medium uppercase leading-relaxed tracking-[0.2em] text-white/70 sm:text-[11px] sm:tracking-[0.24em] md:text-xs md:tracking-[0.26em]">
                              {s.tagline}
                            </span>
                          </span>

                          {/* Right: chevron only — fixed column so arrows line up */}
                          <span className="flex shrink-0 items-center justify-center self-stretch sm:w-12 md:w-14 lg:w-16">
                            <span className="flex h-11 w-11 items-center justify-center md:h-12 md:w-12">
                              <Chevron open={open} />
                            </span>
                          </span>
                        </span>
                      </MagneticButton>
                      <div
                        className={`grid transition-[grid-template-rows] duration-300 ease-porto ${
                          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="border-t border-portoLine/80 px-4 pb-9 pt-6 sm:px-8 md:px-12 md:pb-12 md:pt-8 lg:px-16 lg:pb-14">
                            <p className="porto-body porto-muted max-w-3xl text-pretty text-left text-base leading-relaxed md:text-lg">
                              {s.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
