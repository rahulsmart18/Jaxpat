"use client";

import { framerSpring, textRevealChar, textRevealWord } from "@/lib/motion";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

type AnimatedTextProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** Word-by-word (headlines) or character (short labels) */
  mode?: "words" | "chars";
  delay?: number;
  once?: boolean;
  /** Mount = play on load (hero); scroll = in-view */
  trigger?: "scroll" | "mount";
};

export function AnimatedText({
  text,
  className = "",
  as: Tag = "span",
  mode = "words",
  delay = 0,
  once = true,
  trigger = "scroll",
}: AnimatedTextProps) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once, amount: 0.35 });
  const show = reduceMotion || (trigger === "mount" ? true : inView);
  /** After first reveal, stay visible — avoids re-running when layout/scroll briefly toggles `inView`. */
  const [lockedVisible, setLockedVisible] = useState(false);
  useEffect(() => {
    if (show) setLockedVisible(true);
  }, [show]);
  const animateOn = reduceMotion || lockedVisible;

  const units =
    mode === "chars"
      ? [...text]
      : text.split(/(\s+)/).filter((p) => p.length > 0);

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: mode === "chars" ? 0.02 : 0.06,
        delayChildren: delay,
      },
    },
  };

  const item = mode === "chars" ? textRevealChar : textRevealWord;

  if (reduceMotion) {
    return (
      <Tag className={className} ref={ref}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag ref={ref} className={`animated-text ${className}`}>
      <motion.span
        className="inline"
        initial="hidden"
        animate={animateOn ? "visible" : "hidden"}
        variants={container}
        aria-label={text}
      >
        {units.map((unit, i) => {
          const isSpace = /^\s+$/.test(unit);
          if (isSpace) {
            return (
              <span key={`space-${i}`} className="whitespace-pre">
                {unit}
              </span>
            );
          }
          return (
            <span key={`${unit}-${i}`} className="animated-text-unit">
              <motion.span
                className="animated-text-inner inline-block"
                variants={item}
                transition={framerSpring}
              >
                {unit}
              </motion.span>
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}
