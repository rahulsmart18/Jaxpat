/** Cubic ease-out — matches Rahul portfolio counter feel */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
}
