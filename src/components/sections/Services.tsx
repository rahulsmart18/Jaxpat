"use client";

import { useState } from "react";
import { services } from "@/lib/data";
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
      className="flex min-w-[3.5rem] shrink-0 flex-nowrap justify-start gap-1.5 pt-1"
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
      className={`h-3 w-3 shrink-0 text-white/85 transition-transform duration-300 ease-porto ${
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
      className="border-t border-portoLine px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          {/* Top meta bar — matches reference: index | //SERVICES | FAST DELIVERY */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-portoLine pb-6 text-[10px] font-medium uppercase tracking-[0.32em] text-neutral-500 sm:text-[11px] sm:tracking-[0.35em]">
            <span className="font-sans tabular-nums text-neutral-600">04</span>
            <span className="text-center font-sans text-neutral-400">
              <span className="text-portoAccent">{"//"}</span>
              services
            </span>
            <span className="text-right font-sans text-white/90">
              Fast delivery
            </span>
          </div>
        </Reveal>

        <div className="border border-portoLine">
          <Reveal delay={0.05}>
            <div className="border-b border-portoLine px-5 py-12 md:px-8 md:py-14">
              <h2 className="font-display text-porto-display-sm font-semibold uppercase text-[rgb(128,128,128)]">
                Pro
              </h2>
              <h2 className="mt-2 font-display text-porto-display font-semibold uppercase leading-[0.85] text-white porto-lg:mt-1">
                Services
              </h2>
              <p className="porto-body mt-6 max-w-2xl text-center text-white/90 md:mx-auto">
                Discover our range of services designed to elevate your brand to
                the next level.
              </p>
            </div>
          </Reveal>

          <div>
            {/* Accordion */}
            <div>
              <ul className="divide-y divide-portoLine">
                {services.map((s, i) => {
                  const open = openIndex === i;

                  return (
                    <li key={s.title}>
                      <Reveal delay={0.04 * i}>
                        <div>
                          <button
                            type="button"
                            onClick={() =>
                              setOpenIndex((prev) => (prev === i ? null : i))
                            }
                            className="grid w-full grid-cols-[auto_1fr_auto] items-start gap-x-4 px-5 py-7 text-left transition-colors duration-300 hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portoAccent/35 focus-visible:ring-offset-2 focus-visible:ring-offset-black md:gap-x-6 md:px-8 md:py-8 lg:pl-12"
                            aria-expanded={open}
                          >
                            <ServiceDots
                              rowIndex={i}
                              total={services.length}
                            />
                            <span className="min-w-0">
                              <span className="block font-display text-lg font-semibold text-white md:text-xl">
                                {s.title}
                              </span>
                              <span className="mt-2 block font-sans text-[10px] font-medium uppercase leading-relaxed tracking-[0.22em] text-white/70 md:text-[11px] md:tracking-[0.26em]">
                                {s.tagline}
                              </span>
                            </span>
                            <Chevron open={open} />
                          </button>
                          <div
                            className={`grid transition-[grid-template-rows] duration-300 ease-porto ${
                              open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                            }`}
                          >
                            <div className="overflow-hidden">
                              <div className="grid grid-cols-[auto_1fr_auto] gap-x-4 border-t border-portoLine/80 px-5 pb-8 pt-5 md:gap-x-6 md:px-8 md:pb-9 lg:pl-12">
                                <span className="min-w-[3.5rem] shrink-0" aria-hidden />
                                <p className="porto-body porto-muted min-w-0 max-w-2xl pr-2 md:pr-4">
                                  {s.description}
                                </p>
                                <span className="w-3 shrink-0" aria-hidden />
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
        </div>
      </div>
    </section>
  );
}
