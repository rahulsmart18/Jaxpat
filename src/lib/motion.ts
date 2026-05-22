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
