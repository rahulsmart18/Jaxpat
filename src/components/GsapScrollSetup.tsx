"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { useEffect } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Refreshes ScrollTrigger after route/layout changes. Section reveals use Reveal (GSAP). */
export function GsapScrollSetup() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const refresh = () => ScrollTrigger.refresh();
    refresh();
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, [reduceMotion]);

  return null;
}
