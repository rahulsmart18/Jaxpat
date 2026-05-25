import { HoverWords } from "@/components/motion/HoverWords";
import { Reveal } from "@/components/motion/Reveal";

const phases = [
  {
    step: "01",
    title: "DISCOVER AND ARCHITECT",
    body: "Map goals, audit systems, and design a practical architecture across web, mobile, cloud, and AI.",
  },
  {
    step: "02",
    title: "BUILD AND INTEGRATE",
    body: "Develop full-stack products with Next.js, Android Studio/Flutter apps, and AI integrations including RAG.",
  },
  {
    step: "03",
    title: "DEPLOY AND SCALE",
    body: "Launch with monitoring, optimize performance, and scale data workflows on MongoDB Atlas and Supabase.",
  },
] as const;

function PhaseFigure({ variant }: { variant: 0 | 1 | 2 }) {
  if (variant === 0) {
    return (
      <div
        className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04]"
        aria-hidden
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="#a3a3a3" strokeWidth="1.5" />
          <path
            d="M20 20l-4.3-4.3"
            stroke="#e5e5e5"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }
  if (variant === 1) {
    return (
      <div
        className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04]"
        aria-hidden
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <rect
            x="4"
            y="4"
            width="7"
            height="7"
            rx="1"
            stroke="#a3a3a3"
            strokeWidth="1.5"
          />
          <rect
            x="13"
            y="4"
            width="7"
            height="7"
            rx="1"
            stroke="#d4d4d4"
            strokeWidth="1.5"
          />
          <rect
            x="4"
            y="13"
            width="7"
            height="7"
            rx="1"
            stroke="#d4d4d4"
            strokeWidth="1.5"
          />
          <rect
            x="13"
            y="13"
            width="7"
            height="7"
            rx="1"
            stroke="#a3a3a3"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    );
  }
  return (
    <div
      className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04]"
      aria-hidden
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 12h4l2 8 4-16 2 8h4"
          stroke="#e5e5e5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function Approach() {
  return (
    <section
      id="approach"
      className="border-t border-portoLine porto-safe-x py-20 md:py-32"
    >
      <div className="relative mx-auto max-w-[1400px] overflow-visible">
        <Reveal>
          <div className="grid grid-cols-1 gap-3 border-b border-portoLine pb-8 font-sans text-[11px] uppercase tracking-[0.24em] text-neutral-500 sm:grid-cols-3 sm:items-center sm:gap-4 sm:text-[10px] sm:tracking-[0.28em] md:text-[11px] md:tracking-[0.32em]">
            <span className="text-neutral-600 sm:justify-self-start">01</span>
            <span className="text-center sm:justify-self-center">
              <span className="text-portoAccent">{"//"}</span>{" "}
              <span className="text-neutral-400">Approach</span>
            </span>
            <span className="text-neutral-600 sm:justify-self-end">
              Three phases
            </span>
          </div>
        </Reveal>

        <div className="mt-14 space-y-10 md:mt-20">
          <Reveal delay={0.05}>
            <h2 className="w-full min-w-0 max-w-full font-display text-[clamp(1.15rem,min(4.2vw,3.2svh),2.65rem)] font-semibold uppercase leading-[1.14] tracking-[-0.02em] text-white text-pretty break-words [overflow-wrap:anywhere] sm:tracking-[-0.03em] md:max-w-[920px] md:leading-[1.15] md:tracking-[-0.03em]">
              <HoverWords text="We're Jaxpat, a product-based company based in Chennai, Tamil Nadu." />
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="porto-body porto-muted max-w-2xl text-sm leading-relaxed md:text-base">
              In 2026, we help teams ship production-ready software faster:
              full-stack platforms, mobile apps, Three.js web experiences,
              cloud-native APIs, Retrieval-Augmented Generation (RAG), and VR/AR
              products with one accountable engineering partner.
            </p>
          </Reveal>

          {/* Step numbers aligned to the three columns below */}
          <Reveal delay={0.1}>
            <div className="flex items-center justify-between gap-2 border-b border-portoLine pb-8 sm:gap-4 md:grid md:grid-cols-3 md:pb-10">
              {phases.map((p) => (
                <div
                  key={`step-${p.step}`}
                  className="flex flex-1 justify-center md:flex-none"
                >
                  <span className="flex h-11 min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-full border border-white/20 font-sans text-[11px] text-white touch-manipulation">
                    {p.step}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Columns: inner dividers only (no extra outer rule on the right) */}
          <div className="isolate grid grid-cols-1 gap-12 pt-4 md:grid-cols-3 md:gap-0 md:pt-6">
            {phases.map((p, i) => (
              <Reveal key={p.step} delay={0.06 * i}>
                <div
                  className={`md:px-6 lg:px-10 ${
                    i > 0 ? "md:border-l md:border-portoLine" : ""
                  }`}
                >
                  <p className="font-sans text-[11px] tracking-[0.4em] text-neutral-600">
                    ···
                  </p>
                  <div className="mt-5">
                    <PhaseFigure variant={i as 0 | 1 | 2} />
                  </div>
                  <h3 className="mt-8 font-display text-base font-semibold uppercase leading-snug tracking-wide text-white md:text-lg">
                    <HoverWords as="span" byChar={false} text={p.title} />
                  </h3>
                  <p className="porto-body porto-muted mt-4 text-sm leading-relaxed">
                    {p.body}
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
