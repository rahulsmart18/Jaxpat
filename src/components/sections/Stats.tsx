"use client";

import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import {
  animate,
  useInView,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

function AnimatedStat({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useMotionValueEvent(count, "change", (v) => setDisplay(Math.round(v)));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [inView, count, value]);

  return (
    <div ref={ref} className="border border-portoLine bg-white/[0.02] p-8">
      <div className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-none tracking-tight text-white">
        {display}
        {suffix}
      </div>
      <p className="mt-3 font-sans text-[11px] uppercase tracking-[0.25em] text-neutral-500">
        {label}
      </p>
    </div>
  );
}

export function Stats() {
  return (
    <section className="border-t border-portoLine px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <SectionLabel index="06" tag="Stats" eyebrow="Delivery" />
        </Reveal>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatedStat value={85} suffix="+" label="Production releases" />
          <AnimatedStat value={40} suffix="+" label="AI & automation features" />
          <AnimatedStat value={28} suffix="+" label="Mobile & XR builds" />
          <AnimatedStat value={99} suffix="%" label="On-time milestone rate" />
        </div>
      </div>
    </section>
  );
}
