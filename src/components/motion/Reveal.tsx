"use client";

import { type RevealVariant } from "@/lib/motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  variant?: RevealVariant;
  once?: boolean;
  amount?: number;
};

const variantDefaults: Record<
  RevealVariant,
  { y: number; x?: number; scale?: number; blur?: number }
> = {
  fadeUp: { y: 48 },
  fadeUpBlur: { y: 36, blur: 10 },
  slideLeft: { x: -40, y: 0 },
  slideRight: { x: 40, y: 0 },
  scaleIn: { y: 0, scale: 0.94 },
  fade: { y: 0 },
};

export function Reveal({
  children,
  className,
  delay = 0,
  y,
  variant = "fadeUp",
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = mounted && Boolean(prefersReducedMotion);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || reduceMotion || !ref.current) return;

    const el = ref.current;
    const preset = variantDefaults[variant];
    const from: gsap.TweenVars = {
      autoAlpha: 0,
      y: y ?? preset.y ?? 0,
      duration: 1.05,
      delay,
      ease: "expo.out",
    };

    if (preset.x !== undefined) from.x = preset.x;
    if (preset.scale !== undefined) from.scale = preset.scale;
    if (preset.blur) from.filter = `blur(${preset.blur}px)`;

    const ctx = gsap.context(() => {
      gsap.set(el, {
        autoAlpha: 0,
        y: y ?? preset.y ?? 0,
        x: preset.x ?? 0,
        scale: preset.scale ?? 1,
        filter: preset.blur ? `blur(${preset.blur}px)` : "none",
      });
      gsap.to(el, {
        autoAlpha: 1,
        y: 0,
        x: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.05,
        delay,
        ease: "expo.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [mounted, reduceMotion, delay, y, variant, once]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform, opacity" }}>
      {children}
    </div>
  );
}
