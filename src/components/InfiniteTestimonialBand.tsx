"use client";

import { testimonials } from "@/lib/data";
import Image from "next/image";

type Testimonial = (typeof testimonials)[number];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="relative flex h-[300px] w-[min(78vw,280px)] shrink-0 flex-col overflow-hidden rounded-[10px] border border-portoLine bg-portoPanel shadow-porto transition duration-500 ease-porto hover:border-portoAccent/25 hover:shadow-porto-hover">
      <div className="flex flex-1 gap-3 p-3">
        <div className="relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-md border border-portoLine">
          <Image src={t.image} alt="" fill className="object-cover" sizes="60px" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-sm font-semibold text-white">
            {t.name}
          </p>
          <p className="porto-muted mt-1 line-clamp-2 text-xs leading-snug">
            {t.role}
          </p>
        </div>
      </div>
      <div className="relative flex-1 border-t border-portoLine bg-black p-3">
        <p className="line-clamp-4 text-sm font-medium leading-snug text-white/90">
          &ldquo;{t.quote}&rdquo;
        </p>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "url(https://framerusercontent.com/images/ldf53R2pKtKErtQpdz1GxxWt2I.svg)",
            backgroundSize: "13px auto",
          }}
        />
      </div>
    </div>
  );
}

/**
 * Horizontal infinite marquee of testimonial cards (Framer Ticker 1 / 2 style).
 */
export function InfiniteTestimonialBand({
  reverse = false,
  durationSec = 70,
}: {
  reverse?: boolean;
  durationSec?: number;
}) {
  const strip = (
    <div className="flex shrink-0 gap-6 pr-6">
      {testimonials.map((t) => (
        <TestimonialCard key={t.name} t={t} />
      ))}
    </div>
  );

  return (
    <div
      className="relative overflow-hidden py-2"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div
        className="porto-marquee-track flex w-max will-change-transform"
        style={{
          animation: `porto-marquee ${durationSec}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {strip}
        {strip}
      </div>
    </div>
  );
}
