/** Brand logo assets in `public/logo/`. */
export const BRAND_LOGOS = {
  /** Primary mark — use across navbar, loader, favicon */
  original: "/logo/logo-original.png",
  mono: "/logo/jaxpat-logo-mono.png",
  accent: "/logo/jaxpat-logo-accent.png",
  inverted: "/logo/jaxpat-logo-inverted.png",
  full: "/logo/jaxpat-logo-full.png",
} as const;

export type BrandLogoKey = keyof typeof BRAND_LOGOS;

export const PRIMARY_LOGO = BRAND_LOGOS.original;
