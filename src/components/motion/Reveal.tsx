"use client";

import { framerSpring } from "@/lib/motion";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Framer-style soft entrance (can cause invisible text with some GPU + blend stacks) */
  blur?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  blur = false,
}: RevealProps) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  /** `amount` is reliable cross-browser; avoid % in `margin` (invalid IO in some engines → never “in view” → stuck at opacity 0) */
  const isInView = useInView(ref, { once: true, amount: 0.12 });
  const show = reduceMotion || isInView;

  const hidden = {
    opacity: 0,
    y,
    filter: blur ? ("blur(6px)" as const) : ("none" as const),
  };
  const visible = {
    opacity: 1,
    y: 0,
    filter: "none" as const,
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={hidden}
      animate={show ? visible : hidden}
      transition={{
        ...framerSpring,
        delay: show ? delay : 0,
      }}
    >
      {children}
    </motion.div>
  );
}
