"use client";

import { isFirefox, isIOSOrIPadOS, isWebKitSafari } from "@/lib/browser";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useLayoutEffect, useState } from "react";

const CURSOR_SPRING = { damping: 32, stiffness: 480, mass: 0.28 };

/** Fixed CSS px — not rem/vw so size stays the same across breakpoints and font scaling. */
const CURSOR_SIZE_PX = 14;
const CURSOR_HALF_PX = CURSOR_SIZE_PX / 2;

function cursorAllowed(): boolean {
  if (typeof window === "undefined") return false;
  // `mix-blend-mode: difference` + fixed layers are glitchy on WebKit / iOS;
  // Firefox shows extra repaints with a custom cursor over animated layers.
  if (isIOSOrIPadOS() || isWebKitSafari() || isFirefox()) return false;
  // Primary pointer is fine (mouse / trackpad). Do not require `!coarse`:
  // many laptops report both fine + coarse for touchscreen + mouse.
  return window.matchMedia("(pointer: fine)").matches;
}

/**
 * Fixed-size white circle (CSS px); `mix-blend-mode: difference` inverts it
 * against whatever is under the pointer. Position uses `left`/`top` only so
 * blending composites with the page, not a transformed layer. Native cursor
 * hidden while active (globals.css).
 */
export function FramerCursor() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-20);
  const y = useMotionValue(-20);

  const dotX = useSpring(x, CURSOR_SPRING);
  const dotY = useSpring(y, CURSOR_SPRING);
  const scale = useSpring(1, { damping: 22, stiffness: 400 });

  useLayoutEffect(() => {
    if (!cursorAllowed()) {
      setEnabled(false);
      document.documentElement.classList.remove("framer-cursor-active");
      return;
    }

    setEnabled(true);
    document.documentElement.classList.add("framer-cursor-active");

    const move = (e: MouseEvent) => {
      x.set(e.clientX - CURSOR_HALF_PX);
      y.set(e.clientY - CURSOR_HALF_PX);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target;
      if (t instanceof Element && t.closest("[data-cursor-hover]")) {
        scale.set(2.4);
      }
    };
    const onOut = (e: MouseEvent) => {
      const related = e.relatedTarget;
      if (
        related instanceof Element &&
        related.closest("[data-cursor-hover]")
      ) {
        return;
      }
      scale.set(1);
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      document.documentElement.classList.remove("framer-cursor-active");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [x, y, scale]);

  return (
    <AnimatePresence>
      {enabled ? (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed z-[99999] shrink-0 rounded-full bg-white mix-blend-difference"
          style={{
            left: dotX,
            top: dotY,
            scale,
            width: CURSOR_SIZE_PX,
            height: CURSOR_SIZE_PX,
            minWidth: CURSOR_SIZE_PX,
            minHeight: CURSOR_SIZE_PX,
            maxWidth: CURSOR_SIZE_PX,
            maxHeight: CURSOR_SIZE_PX,
          }}
        />
      ) : null}
    </AnimatePresence>
  );
}
