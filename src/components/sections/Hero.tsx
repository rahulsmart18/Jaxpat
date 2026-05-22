"use client";

import { framerSpring } from "@/lib/motion";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const line = {
  hidden: { opacity: 0, y: "36%" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      ...framerSpring,
      delay: 0.1 + i * 0.07,
    },
  }),
};

/** Dominant word — larger “Jaxpat” headline */
const heroPrimaryClass =
  "font-display font-semibold uppercase leading-[0.82] tracking-[-0.08em] text-white text-[clamp(4rem,min(20vw,26svh),26rem)] sm:tracking-[-0.12em] md:tracking-[-0.16em]";

/** Secondary line — clearly smaller than JAXPAT */
const heroSecondaryClass =
  "font-display font-semibold uppercase leading-[0.88] tracking-[-0.04em] text-[rgb(128,128,128)] text-[clamp(1.2rem,min(4.8vw,6svh),5.75rem)] md:text-[clamp(1.35rem,min(4.2vw,7svh),6.5rem)]";

function IconLocation({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M12 21s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.25" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconGlobe({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconStack({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M12 3 3 8l9 5 9-5-9-5ZM3 13l9 5 9-5M3 18l9 5 9-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-x-clip pb-16 pt-[calc(5.25rem+env(safe-area-inset-top,0px))] md:pb-28 md:pt-[calc(6rem+env(safe-area-inset-top,0px))]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-15%,rgba(255,255,255,0.06),transparent)]" />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 md:px-8">
        {/* Title — centered like reference */}
        <h1 className="text-center">
          <motion.span
            custom={0}
            variants={line}
            initial="hidden"
            animate="show"
            className={`block overflow-hidden ${heroPrimaryClass}`}
          >
            Jaxpat
          </motion.span>
          <motion.span
            custom={1}
            variants={line}
            initial="hidden"
            animate="show"
            className={`mt-1 block overflow-hidden md:mt-2 ${heroSecondaryClass}`}
          >
            Technology
          </motion.span>
        </h1>

        {/* Three-column info bar (aligns with backdrop guide lines) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...framerSpring, delay: 0.32 }}
          className="mx-auto mt-10 max-w-[1200px] border-y border-portoLine md:mt-16"
        >
          <div className="divide-y divide-portoLine md:grid md:grid-cols-3 md:divide-x md:divide-y-0">
            <div className="flex flex-col items-center px-2 py-8 text-center sm:px-4 md:px-6 md:py-10">
              <IconLocation className="mb-4 shrink-0 text-emerald-400" aria-hidden />
              <p className="max-w-[260px] font-sans text-[11px] font-medium uppercase leading-relaxed tracking-[0.22em] text-neutral-400 md:tracking-[0.28em]">
                Based in Chennai,
                <br />
                Tamil Nadu
              </p>
            </div>
            <div className="flex flex-col items-center px-2 py-8 text-center sm:px-4 md:px-6 md:py-10">
              <IconGlobe className="mb-4 shrink-0 text-neutral-200" aria-hidden />
              <p className="max-w-[260px] font-sans text-[11px] font-medium uppercase leading-relaxed tracking-[0.22em] text-neutral-400 md:tracking-[0.28em]">
                Available all around
                <br />
                worldwide
              </p>
            </div>
            <div className="flex flex-col items-center px-2 py-8 text-center sm:px-4 md:px-6 md:py-10">
              <IconStack className="mb-4 shrink-0 text-sky-400" aria-hidden />
              <p className="max-w-[280px] font-sans text-[11px] font-medium uppercase leading-relaxed tracking-[0.22em] text-neutral-400 md:tracking-[0.28em]">
                AI · Full-stack · Mobile
                <br />
                Embedded · VR / AR
              </p>
            </div>
          </div>
        </motion.div>

        {/* Hero image — engineering context */}
        <motion.div
          data-cursor-hover
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...framerSpring, delay: 0.22 }}
          className="group/portrait relative mx-auto mt-12 aspect-[538/296] w-full max-w-[min(100%,980px)] overflow-hidden rounded-3xl border border-white/[0.12] bg-portoPanel shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_24px_80px_rgba(0,0,0,0.55)] ring-1 ring-white/[0.06] transition duration-500 ease-porto hover:border-portoAccent/35 hover:shadow-[0_0_0_1px_rgba(94,234,212,0.12),0_28px_90px_rgba(0,0,0,0.6)] md:mt-16"
        >
          <motion.div
            style={{ y: parallaxY }}
            className="absolute inset-[-8%]"
            initial={false}
          >
            <Image
              src="/light.jpg"
              alt="Software engineering — design, code, and systems"
              fill
              priority
              unoptimized
              sizes="(max-width: 768px) 100vw, 980px"
              className="object-cover object-center transition duration-700 ease-out group-hover/portrait:scale-[1.04]"
            />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-portoAccent/25 via-emerald-950/10 to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.4] mix-blend-overlay"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 90% 70% at 50% 100%, rgba(94,234,212,0.12), transparent 55%)",
            }}
            aria-hidden
          />
        </motion.div>
      </div>
    </section>
  );
}
