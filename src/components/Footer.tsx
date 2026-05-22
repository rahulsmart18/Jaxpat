"use client";

import { framerSpring } from "@/lib/motion";
import { COMPANY_NAME_UPPER } from "@/lib/site-brand";
import { motion } from "framer-motion";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-portoLine bg-gradient-to-b from-zinc-950 via-black to-black px-4 py-14 pb-[max(2rem,env(safe-area-inset-bottom,0px))] sm:px-6 md:px-8 md:py-16 md:pb-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "url(https://framerusercontent.com/images/ldf53R2pKtKErtQpdz1GxxWt2I.svg)",
          backgroundSize: "13px auto",
        }}
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col gap-8 text-center">
        <div className="grid items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
          <div className="hidden md:block" aria-hidden />
          <div className="flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={framerSpring}
            className="font-display text-4xl font-semibold tracking-tight text-white md:text-5xl"
          >
            {COMPANY_NAME_UPPER}
          </motion.h2>
          <p className="mt-3 font-sans text-xs text-neutral-500">
            ©2026{" "}
            <Link
              href="/"
              className="text-neutral-400 underline-offset-4 transition-colors hover:text-portoAccent hover:underline"
            >
              {COMPANY_NAME_UPPER}
            </Link>
          </p>
        </div>
          <div className="flex justify-center md:justify-end">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="rounded-full border border-white/15 px-5 py-3 font-sans text-[11px] uppercase tracking-[0.25em] text-neutral-400 transition hover:border-white/30 hover:text-white touch-manipulation active:bg-white/[0.06] md:py-2"
        >
          Back To Top
        </button>
          </div>
        </div>
      </div>
      <div className="relative z-10 mx-auto mt-12 grid max-w-[1400px] gap-0 border-y border-portoLine md:grid-cols-4">
        <div className="border-b border-portoLine px-6 py-7 text-left md:border-b-0 md:border-r md:px-8">
          <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-neutral-500">
            Follow Me
          </p>
          <div className="mt-3 space-y-1.5">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="block font-sans text-[12px] uppercase tracking-[0.14em] text-white transition hover:text-portoAccent"
            >
              Instagram ↗
            </a>
            <a
              href="https://dribbble.com/"
              target="_blank"
              rel="noreferrer"
              className="block font-sans text-[12px] uppercase tracking-[0.14em] text-white transition hover:text-portoAccent"
            >
              Dribbble ↗
            </a>
            <a
              href="https://x.com/"
              target="_blank"
              rel="noreferrer"
              className="block font-sans text-[12px] uppercase tracking-[0.14em] text-white transition hover:text-portoAccent"
            >
              Twitter ↗
            </a>
          </div>
        </div>

        <div className="border-b border-portoLine px-6 py-7 text-left md:border-b-0 md:border-r md:px-8">
          <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-neutral-500">
            Current Location
          </p>
          <p className="mt-3 font-sans text-[12px] uppercase leading-relaxed tracking-[0.14em] text-white/90">
            41, Arunagiri Street, West Kamakoti Nagar, Valasaravakkam, Chennai,
            Tamil Nadu 600087
          </p>
        </div>

        <div className="border-b border-portoLine px-6 py-7 text-left md:border-b-0 md:border-r md:px-8">
          <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-neutral-500">
            Phone
          </p>
          <p className="mt-3 font-sans text-[12px] uppercase leading-relaxed tracking-[0.14em] text-white/90">
            +91 8122699058
          </p>
          <p className="mt-1 font-sans text-[12px] uppercase leading-relaxed tracking-[0.14em] text-white/90">
            +91 7738057380
          </p>
        </div>

        <div className="px-6 py-7 text-left md:px-8">
          <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-neutral-500">
            Email Me
          </p>
          <p className="mt-3 font-sans text-[12px] uppercase leading-relaxed tracking-[0.14em] text-white/90">
            hello@jaxpattechnology.com
          </p>
          <p className="mt-1 font-sans text-[12px] uppercase leading-relaxed tracking-[0.14em] text-white/90">
            contact@jaxpattechnology.com
          </p>
        </div>
      </div>
    </footer>
  );
}
