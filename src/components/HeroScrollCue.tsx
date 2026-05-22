"use client";

import { useLoaderComplete } from "@/hooks/useLoaderComplete";
import { motion, useReducedMotion } from "framer-motion";

const loopEase = [0.42, 0, 0.58, 1] as const;

export function HeroScrollCue() {
  const reduceMotion = useReducedMotion();
  const loaderDone = useLoaderComplete();
  if (reduceMotion) return null;

  return (
    <motion.div
      className="mt-12 flex flex-col items-center gap-3 md:mt-16"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: loaderDone ? 0.2 : 0.45,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <span className="font-sans text-[10px] uppercase tracking-[0.38em] text-neutral-600">
        Scroll
      </span>
      <motion.div
        className="flex h-12 w-7 items-start justify-center overflow-hidden rounded-full border border-white/12 bg-white/[0.03] p-1.5 will-change-[opacity] backdrop-blur-sm"
        initial={{ opacity: 0.65 }}
        animate={{ opacity: [0.55, 1, 0.55] }}
        transition={{
          duration: 1.35,
          repeat: Infinity,
          ease: "easeInOut",
          delay: loaderDone ? 0.15 : 0.35,
        }}
      >
        <motion.span
          className="h-2 w-1 rounded-full bg-white/80 will-change-transform"
          animate={{ y: [0, 16, 0], opacity: [1, 0.4, 1] }}
          transition={{
            duration: 1.35,
            repeat: Infinity,
            ease: loopEase,
            delay: loaderDone ? 0.15 : 0.35,
          }}
        />
      </motion.div>
      <motion.span
        className="h-px w-8 bg-gradient-to-r from-transparent via-white/40 to-transparent will-change-transform"
        animate={{ scaleX: [0.65, 1, 0.65], opacity: [0.4, 0.92, 0.4] }}
        transition={{
          duration: 1.35,
          repeat: Infinity,
          ease: "easeInOut",
          delay: loaderDone ? 0.15 : 0.35,
        }}
      />
    </motion.div>
  );
}
