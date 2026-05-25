"use client";

import { AmbientOrbs } from "@/components/AmbientOrbs";
import { HeroScrollCue } from "@/components/HeroScrollCue";
import { HoverWords } from "@/components/motion/HoverWords";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { useLoaderComplete } from "@/hooks/useLoaderComplete";
import { portoEase } from "@/lib/motion";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const heroHidden = { opacity: 0, y: 28 };
const heroVisible = { opacity: 1, y: 0 };

/** Dominant word — “Jaxpat” only on the hero; legal name lives in the footer */
const heroPrimaryClass =
  "font-display font-semibold uppercase leading-[0.82] tracking-[-0.08em] text-[clamp(2.15rem,min(12.5vw,18svh),14rem)] phone:text-[clamp(2.45rem,min(14vw,20svh),16rem)] sm:text-[clamp(3rem,min(17vw,22svh),20rem)] md:text-[clamp(3.75rem,min(18vw,24svh),24rem)] sm:tracking-[-0.1em] md:tracking-[-0.14em]";

const heroTaglineClass =
  "font-sans text-xs font-medium uppercase tracking-[0.12em] sm:text-sm sm:tracking-[0.14em] md:text-base";

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
  const loaderDone = useLoaderComplete();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-x-clip pb-16 pt-[calc(4.75rem+env(safe-area-inset-top,0px))] md:pb-28 md:pt-[calc(5.5rem+env(safe-area-inset-top,0px))]"
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 45% 40% at 18% 20%, rgba(255, 255, 255, 0.04), transparent 58%),
            radial-gradient(ellipse 42% 38% at 82% 25%, rgba(255, 255, 255, 0.03), transparent 55%)
          `,
        }}
      />
      <AmbientOrbs />

      <div className="relative mx-auto max-w-[1400px] porto-safe-x">
        {/* Title — centered like reference */}
        <ParallaxLayer distance={28} className="text-center">
        <h1 className="mx-auto max-w-full text-center break-words">
          <motion.span
            className={`block max-w-full ${heroPrimaryClass}`}
            initial={heroHidden}
            animate={loaderDone ? heroVisible : heroHidden}
            transition={{ duration: 0.9, ease: portoEase, delay: 0.12 }}
          >
            {loaderDone ? (
              <HoverWords
                as="span"
                byChar
                text="Jaxpat"
                className={heroPrimaryClass}
              />
            ) : (
              <span className={heroPrimaryClass} aria-hidden>
                Jaxpat
              </span>
            )}
          </motion.span>
          <motion.p
            initial={heroHidden}
            animate={loaderDone ? heroVisible : heroHidden}
            transition={{ duration: 0.85, ease: portoEase, delay: 0.28 }}
            className={`mx-auto mt-8 max-w-xl text-center ${heroTaglineClass}`}
          >
            {loaderDone ? (
              <HoverWords
                as="span"
                byChar={false}
                text="AI · Full-stack · Mobile · Embedded · VR / AR"
                className={heroTaglineClass}
              />
            ) : (
              <span className={heroTaglineClass} aria-hidden>
                AI · Full-stack · Mobile · Embedded · VR / AR
              </span>
            )}
          </motion.p>
        </h1>
        </ParallaxLayer>

        {/* Three-column info bar (aligns with backdrop guide lines) */}
        <motion.div
          initial={heroHidden}
          animate={loaderDone ? heroVisible : heroHidden}
          transition={{ duration: 0.85, ease: portoEase, delay: 0.62 }}
          className="mx-auto mt-10 max-w-[1200px] border-y border-portoLine md:mt-16"
        >
          <div className="divide-y divide-portoLine md:grid md:grid-cols-3 md:divide-x md:divide-y-0">
            <div className="flex flex-col items-center px-3 py-8 text-center phone:px-4 sm:px-4 md:px-6 md:py-10">
              <IconLocation className="mb-4 shrink-0 text-white/70" aria-hidden />
              <p className="max-w-[260px] font-sans text-[11px] font-medium uppercase leading-relaxed tracking-[0.22em] text-neutral-400 md:tracking-[0.28em]">
                Based in Chennai,
                <br />
                Tamil Nadu
              </p>
            </div>
            <div className="flex flex-col items-center px-3 py-8 text-center phone:px-4 sm:px-4 md:px-6 md:py-10">
              <IconGlobe className="mb-4 shrink-0 text-neutral-400" aria-hidden />
              <p className="max-w-[260px] font-sans text-[11px] font-medium uppercase leading-relaxed tracking-[0.22em] text-neutral-400 md:tracking-[0.28em]">
                Available all around
                <br />
                worldwide
              </p>
            </div>
            <div className="flex flex-col items-center px-3 py-8 text-center phone:px-4 sm:px-4 md:px-6 md:py-10">
              <IconStack className="mb-4 shrink-0 text-neutral-300" aria-hidden />
              <p className="max-w-[280px] font-sans text-[11px] font-medium uppercase leading-relaxed tracking-[0.22em] text-neutral-400 md:tracking-[0.28em]">
                AI · Full-stack · Mobile ·
                <br />
                Embedded · VR / AR
              </p>
            </div>
          </div>
        </motion.div>

        {/* Hero image — engineering context */}
        <motion.div
          data-cursor-hover
          initial={{ opacity: 0, y: 48, scale: 0.96 }}
          animate={
            loaderDone
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 48, scale: 0.96 }
          }
          transition={{ duration: 1, ease: portoEase, delay: 0.78 }}
          className="group/portrait relative mx-auto mt-12 aspect-[538/296] w-full max-w-[min(100%,980px)] overflow-hidden rounded-2xl border border-white/[0.12] bg-portoPanel shadow-porto ring-1 ring-white/[0.06] transition-[transform,border-color,box-shadow] duration-500 ease-porto hover:border-white/30 hover:shadow-porto-hover motion-safe:md:hover:-translate-y-1.5 md:rounded-3xl md:mt-16"
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
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/[0.04]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.4] mix-blend-overlay"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 90% 70% at 50% 100%, rgba(255,255,255,0.08), transparent 55%)",
            }}
            aria-hidden
          />
        </motion.div>

        <HeroScrollCue />
      </div>
    </section>
  );
}
