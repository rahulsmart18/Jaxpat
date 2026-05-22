/**
 * Palette derived from logo-original.png:
 * — Left: deep navy silhouette
 * — Right: royal / circuit blue
 * — Accents: white circuitry, cool silver
 */
export const brandColors = {
  black: "#000000",
  navy: "#0B1D35",
  navyDeep: "#061220",
  blue: "#0056B3",
  blueBright: "#1A7FED",
  blueSoft: "#3D8DD9",
  silver: "#B8C5D4",
  silverMuted: "#7A8799",
  grey: "#808080",
  white: "#FFFFFF",
  circuit: "#E8EEF5",
} as const;

/** CSS custom properties (space-separated RGB) */
export const brandCssVars = {
  navy: "11 29 53",
  navyDeep: "6 18 32",
  blue: "0 86 179",
  blueBright: "26 127 237",
  silver: "184 197 212",
  silverMuted: "122 135 153",
  accent: "0 86 179",
} as const;
