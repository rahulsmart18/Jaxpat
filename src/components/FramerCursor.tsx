"use client";

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

    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      document.documentElement.classList.remove("framer-cursor-active");
      window.removeEventListener("mousemove", move);
    };
  }, [x, y]);

  return (
    <AnimatePresence>
      {enabled ? (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed z-[99999] shrink-0 rounded-full bg-white mix-blend-difference"
          style={{
            left: dotX,
            top: dotY,
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
