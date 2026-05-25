"use client";

import { portoEase } from "@/lib/motion";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

const STEPS = ["BRIEF", "UI", "API", "DATA", "AI", "SHIP"] as const;

const NODES = [
  { x: 200, y: 48, label: "01" },
  { x: 318, y: 116, label: "02" },
  { x: 318, y: 244, label: "03" },
  { x: 200, y: 312, label: "04" },
  { x: 82, y: 244, label: "05" },
  { x: 82, y: 116, label: "06" },
] as const;

const HEX_PATH =
  "M 200 48 L 318 116 L 318 244 L 200 312 L 82 244 L 82 116 Z";

export function ProcessOrbit() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.3"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 32,
    mass: 0.28,
  });

  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1]);
  const ringRotate = useTransform(smoothProgress, [0, 1], [0, 42]);
  const centerGlow = useTransform(smoothProgress, [0, 1], [0.12, 0.3]);

  useMotionValueEvent(smoothProgress, "change", (v) => {
    setActiveIndex(Math.min(STEPS.length - 1, Math.floor(v * STEPS.length)));
  });

  return (
    <motion.div
      ref={ref}
      className="relative mx-auto aspect-[400/360] w-full max-w-[min(100%,420px)]"
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.75, ease: portoEase }}
    >
      <motion.div
        className="pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(0,86,179,0.12),transparent_68%)]"
        style={{ rotate: ringRotate, opacity: centerGlow }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute inset-[14%] rounded-full border border-white/10"
        style={{ rotate: ringRotate }}
        animate={reduceMotion ? undefined : { scale: [1, 1.05, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <svg
        viewBox="0 0 400 360"
        className="relative z-10 h-full w-full"
        aria-hidden
      >
        <path
          d={HEX_PATH}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={1}
        />
        <motion.path
          d={HEX_PATH}
          fill="none"
          stroke="rgba(26,127,237,0.75)"
          strokeWidth={1.5}
          strokeLinecap="round"
          style={{
            pathLength: reduceMotion ? 1 : pathLength,
            filter: "drop-shadow(0 0 12px rgba(0,86,179,0.35))",
          }}
        />
        {NODES.map((node, i) => (
          <g key={node.label} transform={`translate(${node.x}, ${node.y})`}>
            <motion.circle
              r={6}
              fill="#0a0a0a"
              stroke={
                activeIndex === i
                  ? "rgba(26,127,237,0.95)"
                  : "rgba(184,197,212,0.35)"
              }
              strokeWidth={activeIndex === i ? 2 : 1.25}
              animate={{
                scale: activeIndex === i ? 1.4 : 1,
                opacity: activeIndex === i ? 1 : 0.45,
              }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
            />
            {activeIndex === i ? (
              <circle
                r={18}
                fill="none"
                stroke="rgba(0,86,179,0.35)"
                strokeWidth={1}
              />
            ) : null}
            <text
              y={24}
              textAnchor="middle"
              fill={activeIndex === i ? "#B8C5D4" : "#4A5568"}
              style={{ fontSize: 9, fontFamily: "var(--font-inter), sans-serif" }}
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      <motion.div
        className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center"
        key={STEPS[activeIndex]}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: portoEase }}
      >
        <span className="font-display text-4xl font-semibold text-white/12 md:text-5xl">
          06
        </span>
        <span className="mt-2 font-sans text-[9px] uppercase tracking-[0.42em] text-neutral-400">
          {STEPS[activeIndex]}
        </span>
      </motion.div>
    </motion.div>
  );
}
