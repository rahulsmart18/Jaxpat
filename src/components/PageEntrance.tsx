"use client";

import { portoEase } from "@/lib/motion";
import { consumeFirstReveal } from "@/lib/site-loader";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function PageEntrance({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [firstReveal, setFirstReveal] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setReady(true);
      return;
    }

    const sync = () => {
      const loading = document.body.classList.contains("is-loading");
      if (!loading) {
        setFirstReveal(consumeFirstReveal());
      }
      setReady(!loading);
    };

    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, [reduceMotion]);

  if (reduceMotion || (ready && !firstReveal)) {
    return <>{children}</>;
  }

  if (ready && firstReveal) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.95, ease: portoEase }}
      >
        {children}
      </motion.div>
    );
  }

  return <>{children}</>;
}
