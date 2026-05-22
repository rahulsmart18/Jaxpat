"use client";

import { portoEase } from "@/lib/motion";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import { useRef } from "react";

type HoverWordsProps = {
  text: string;
  className?: string;
  split?: string | RegExp;
  as?: "span" | "p" | "h1" | "h2" | "h3";
  /** Animate letters within each word (staggered once) */
  byChar?: boolean;
  /**
   * Per-word blue hover (headings). Default `true`; set `false` for labels in body
   * copy (e.g. small caps in cards) where hover should stay neutral.
   */
  headingInteractive?: boolean;
};

function isGlyphChar(char: string) {
  if (char === " " || char === "\u00a0") return false;
  return !/[\w'’-]/u.test(char);
}

/**
 * One-time in-view word/letter reveal. Words use flex `gap` for spacing.
 * Blue per-word hover applies only when `headingInteractive` (see globals `.hover-word--heading`).
 */
export function HoverWords({
  text,
  className = "",
  split = " ",
  as: Tag = "span",
  byChar = true,
  headingInteractive = true,
}: HoverWordsProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.22, margin: "0px 0px -8% 0px" });
  const rootClass = [
    "hover-word",
    headingInteractive && "hover-word--heading",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const parts =
    split === "" ? [...text] : text.split(split).filter(Boolean);

  if (reduceMotion) {
    return <Tag className={rootClass}>{text}</Tag>;
  }

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: byChar ? 0.012 : 0.045,
        delayChildren: 0.04,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.42, ease: portoEase },
    },
  };

  return (
    <Tag className={rootClass}>
      <motion.span
        ref={ref}
        className="inline-flex max-w-full flex-row flex-wrap items-baseline gap-x-[0.3em] gap-y-1"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={container}
        aria-label={text}
      >
        {parts.map((word, wi) => (
          <span key={`${word}-${wi}`} className="hover-word-char-group">
            {byChar ? (
              word.split("").map((char, ci) => (
                <motion.span
                  key={`${char}-${ci}`}
                  className="inline-block"
                  variants={item}
                  aria-hidden
                >
                  <span
                    className={`hover-word-char${
                      headingInteractive && char !== " " && isGlyphChar(char)
                        ? " hover-word-char--glyph"
                        : ""
                    }`}
                    style={{ "--intra": ci } as CSSProperties}
                  >
                    {char === " " ? "\u00a0" : char}
                  </span>
                </motion.span>
              ))
            ) : (
              <motion.span className="inline-block" variants={item}>
                <span className="hover-word-char">{word}</span>
              </motion.span>
            )}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
