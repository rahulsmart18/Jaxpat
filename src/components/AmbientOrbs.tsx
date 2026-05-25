"use client";

import { isFirefox } from "@/lib/browser";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/** Ambient fields mirroring logo split: navy left, blue right */
export function AmbientOrbs() {
  const reduceMotion = useReducedMotion();
  const [geckoLite, setGeckoLite] = useState(false);

  useEffect(() => {
    setGeckoLite(isFirefox());
  }, []);

  if (reduceMotion) return null;

  if (geckoLite) {
    return (
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -left-[20%] top-[8%] h-[min(55vw,420px)] w-[min(55vw,420px)] rounded-full bg-[radial-gradient(circle,rgba(11,29,53,0.28),transparent_68%)] blur-2xl" />
        <div className="absolute -right-[15%] top-[35%] h-[min(45vw,360px)] w-[min(45vw,360px)] rounded-full bg-[radial-gradient(circle,rgba(0,86,179,0.14),transparent_70%)] blur-2xl" />
        <div className="absolute bottom-[10%] left-[30%] h-[min(40vw,280px)] w-[min(40vw,280px)] rounded-full bg-[radial-gradient(circle,rgba(184,197,212,0.04),transparent_72%)] blur-xl opacity-70" />
      </div>
    );
  }

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <motion.div
        className="absolute -left-[20%] top-[8%] h-[min(55vw,420px)] w-[min(55vw,420px)] rounded-full bg-[radial-gradient(circle,rgba(11,29,53,0.35),transparent_68%)] blur-3xl"
        animate={{ x: [0, 24, 0], y: [0, -18, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-[15%] top-[35%] h-[min(45vw,360px)] w-[min(45vw,360px)] rounded-full bg-[radial-gradient(circle,rgba(0,86,179,0.18),transparent_70%)] blur-3xl"
        animate={{ x: [0, -20, 0], y: [0, 22, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[30%] h-[min(40vw,280px)] w-[min(40vw,280px)] rounded-full bg-[radial-gradient(circle,rgba(184,197,212,0.05),transparent_72%)] blur-3xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
