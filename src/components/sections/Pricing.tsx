"use client";

import { pricingFeatures } from "@/lib/data";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

/** Tamil Nadu locale — Indian digit grouping, INR */
const inr = new Intl.NumberFormat("ta-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const plans = [
  {
    name: "Discovery sprint",
    monthly: 41_500,
    annual: 37_300,
    description:
      "Architecture review, spike on AI, mobile, embedded, or XR scope, and a written plan with risks and estimates.",
    highlight: false,
  },
  {
    name: "Product squad",
    monthly: 66_400,
    annual: 58_000,
    description:
      "Dedicated engineers shipping features across your stack—integrations, APIs, apps, firmware touchpoints, and releases.",
    highlight: true,
    badge: "PRO",
  },
  {
    name: "Embedded team",
    monthly: 107_800,
    annual: 91_200,
    description:
      "Larger engagements with lead coverage, on-call alignment, security reviews, and roadmap ownership alongside your staff.",
    highlight: false,
  },
] as const;

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section
      id="pricing"
      className="border-t border-portoLine px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <SectionLabel index="09" tag="Pricing" eyebrow="Engagements" />
        </Reveal>
        <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal delay={0.05}>
            <div>
              <h2 className="font-display text-porto-display-sm font-semibold uppercase text-white">
                Big or small?
              </h2>
              <h2 className="mt-2 font-display text-porto-display font-semibold text-[rgb(128,128,128)] porto-lg:mt-1">
                i HAVE A PLAN.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] p-1">
              <button
                type="button"
                onClick={() => setAnnual(false)}
                className={`relative rounded-full px-5 py-2 text-xs font-medium uppercase tracking-[0.2em] transition ${
                  !annual ? "text-white" : "text-neutral-500"
                }`}
              >
                {!annual ? (
                  <motion.span
                    layoutId="pricing-toggle"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                ) : null}
                <span className="relative z-10">Monthly</span>
              </button>
              <button
                type="button"
                onClick={() => setAnnual(true)}
                className={`relative rounded-full px-5 py-2 text-xs font-medium uppercase tracking-[0.2em] transition ${
                  annual ? "text-white" : "text-neutral-500"
                }`}
              >
                {annual ? (
                  <motion.span
                    layoutId="pricing-toggle"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                ) : null}
                <span className="relative z-10">Annual</span>
              </button>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={0.08 * i}>
              <motion.article
                layout
                className={`relative flex h-full flex-col border p-8 ${
                  plan.highlight
                    ? "border-white/25 bg-white/[0.04]"
                    : "border-portoLine bg-white/[0.02]"
                }`}
              >
                {plan.highlight && "badge" in plan && plan.badge ? (
                  <span className="absolute right-6 top-6 rounded-full border border-white/20 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.25em] text-neutral-300">
                    {plan.badge}
                  </span>
                ) : null}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={annual ? "a" : "m"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="font-display text-4xl text-white md:text-5xl">
                      {inr.format(annual ? plan.annual : plan.monthly)}
                    </p>
                    <p className="mt-3 font-sans text-xs text-neutral-500">
                      /month
                    </p>
                  </motion.div>
                </AnimatePresence>
                <h3 className="mt-8 font-display text-xl text-white">
                  {plan.name}
                </h3>
                <p className="porto-body porto-muted mt-3">{plan.description}</p>
                <p className="mt-8 font-sans text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                  What&apos;s included
                </p>
                <ul className="porto-body porto-muted mt-4 space-y-3">
                  {pricingFeatures.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-neutral-600">—</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
