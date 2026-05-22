"use client";

import { framerSpring, staggerItem as staggerItemVariant } from "@/lib/motion";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

type StaggerRevealProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
};

export function StaggerReveal({
  children,
  className,
  stagger = 0.09,
  once = true,
}: StaggerRevealProps) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once, amount: 0.08 });
  const show = reduceMotion || inView;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={show ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: 0.05 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerItemVariant}>
      {children}
    </motion.div>
  );
}

export function StaggerItemSpring({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 28 },
        visible: { opacity: 1, y: 0, transition: framerSpring },
      }}
    >
      {children}
    </motion.div>
  );
}
