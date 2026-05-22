"use client";

import { portoEase } from "@/lib/motion";
import {
  motion,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { useRef, type MouseEvent, type ReactNode } from "react";

const TILT_SPRING = { stiffness: 280, damping: 24, mass: 0.7 };

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees */
  intensity?: number;
  disabled?: boolean;
};

export function TiltCard({
  children,
  className = "",
  intensity = 9,
  disabled = false,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(0, TILT_SPRING);
  const rotateY = useSpring(0, TILT_SPRING);
  const lift = useSpring(0, TILT_SPRING);

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
    lift.set(0);
  };

  const applyTilt = (clientX: number, clientY: number) => {
    if (disabled || reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (clientX - rect.left) / rect.width - 0.5;
    const py = (clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * intensity * 2.2);
    rotateX.set(-py * intensity * 2.2);
    lift.set(-6);
  };

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    applyTilt(e.clientX, e.clientY);
  };

  if (reduceMotion || disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{
        rotateX,
        rotateY,
        y: lift,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      transition={{ ease: portoEase }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

/** Optional glare overlay for tilt cards */
export function TiltGlare({
  rotateX,
  rotateY,
}: {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.12), transparent 55%)",
        rotateX,
        rotateY,
      }}
      aria-hidden
    />
  );
}
