"use client";

const DEFAULT_PHRASES = [
  "JAXPAT TECHNOLOGY",
  "AI integration",
  "Full-stack",
  "Mobile apps",
  "Embedded",
  "VR / AR",
  "Cloud & APIs",
  "Retrieval-Augmented Generation",
  "MongoDB Atlas",
  "Supabase",
  "Android Studio",
  "Flutter",
  "JAXPAT TECHNOLOGY",
] as const;

type MarqueeStripProps = {
  phrases?: readonly string[];
  /** Seconds for one full loop */
  durationSec?: number;
  className?: string;
};

export function MarqueeStrip({
  phrases = DEFAULT_PHRASES,
  durationSec = 50,
  className = "",
}: MarqueeStripProps) {
  const text = `${phrases.join("  #  ")}  #  `;

  const strip = (
    <div className="flex shrink-0 items-center pr-20">
      <span className="whitespace-nowrap font-display text-[clamp(2.25rem,7vw,4.5rem)] font-semibold uppercase tracking-[-0.04em] text-white/[0.82]">
        {text}
      </span>
    </div>
  );

  return (
    <div
      className={`relative overflow-hidden border-y border-portoLine bg-gradient-to-b from-zinc-950/95 via-black to-black py-7 ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div
        className="porto-marquee-track flex w-max will-change-transform"
        style={{
          animation: `porto-marquee ${durationSec}s linear infinite`,
        }}
      >
        {strip}
        {strip}
      </div>
    </div>
  );
}
