"use client";

import { portoEase } from "@/lib/motion";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  /** Snappier than default so the bar tracks scroll without noticeable lag */
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 38,
    mass: 0.12,
    restDelta: 0.0005,
  });

  if (reduceMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 top-0 z-[400] h-[2px] origin-left bg-gradient-to-r from-portoNavy/40 via-portoBlueBright to-portoNavy/40"
      style={{ scaleX }}
      transition={{ ease: portoEase }}
      aria-hidden
    />
  );
}
