/** Matches Framer appear presets from porto-template (spring, ~200/40). */

export const framerSpring = {
  type: "spring" as const,
  damping: 40,
  stiffness: 200,
  mass: 1,
};

export const framerSpringSoft = {
  type: "spring" as const,
  damping: 35,
  stiffness: 180,
  mass: 1,
};

export const framerSpringSnappy = {
  type: "spring" as const,
  damping: 28,
  stiffness: 320,
  mass: 0.85,
};

/** Premium ease — matches site `ease-porto` */
export const portoEase = [0.22, 1, 0.36, 1] as const;

/** Route change — subtle fade + lift (no heavy blur) */
export const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: 0.38, ease: portoEase },
} as const;

export type RevealVariant =
  | "fadeUp"
  | "fadeUpBlur"
  | "slideLeft"
  | "slideRight"
  | "scaleIn"
  | "fade";

export const revealVariants: Record<
  RevealVariant,
  { hidden: Record<string, unknown>; visible: Record<string, unknown> }
> = {
  fadeUp: {
    hidden: { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0 },
  },
  /** Kept for API compat — CSS filter blur is removed for cross-browser perf. */
  fadeUpBlur: {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

export const textRevealWord = {
  hidden: { opacity: 0, y: "110%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: portoEase },
  },
};

export const textRevealChar = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: portoEase },
  },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.04,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: framerSpring,
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: framerSpringSoft,
  },
};
