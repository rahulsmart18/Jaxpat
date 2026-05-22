"use client";

import { useNarrowViewport } from "@/hooks/useNarrowViewport";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef, type ReactNode } from "react";

type ParallaxLayerProps = {
  children: ReactNode;
  className?: string;
  /** Pixel travel at scroll extremes */
  distance?: number;
  offset?: ["start end", "end start"];
};

export function ParallaxLayer({
  children,
  className = "",
  distance = 48,
  offset = ["start end", "end start"],
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const narrow = useNarrowViewport();
  const effectiveDistance = useMemo(() => {
    if (narrow) return Math.min(distance, 14);
    return distance;
  }, [distance, narrow]);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });
  const y = useTransform(scrollYProgress, [0, 1], [effectiveDistance, -effectiveDistance]);

  if (reduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={className}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Subtle horizontal drift for decorative layers */
export function ParallaxDrift({
  children,
  className = "",
  xDistance = 24,
}: {
  children: ReactNode;
  className?: string;
  xDistance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const narrow = useNarrowViewport();
  const effectiveX = useMemo(() => {
    if (narrow) return Math.min(xDistance, 10);
    return xDistance;
  }, [narrow, xDistance]);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [-effectiveX, effectiveX]);

  if (reduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={className}>
      <motion.div style={{ x }} className="will-change-transform">
        {children}
      </motion.div>
    </motion.div>
  );
}
