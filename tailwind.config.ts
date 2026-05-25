import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        /** Common modern phone width — fine-tune dense layouts */
        phone: "390px",
        porto: "810px",
        "porto-lg": "1200px",
        "porto-xl": "1440px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        portoLine: "rgb(32, 38, 48)",
        portoPanel: "rgb(10, 12, 16)",
        portoNavy: "#0B1D35",
        portoNavyDeep: "#061220",
        portoBlue: "#0056B3",
        portoBlueBright: "#1A7FED",
        portoAccent: "#1A7FED",
        portoAccentMuted: "rgba(0, 86, 179, 0.45)",
        portoSilver: "#B8C5D4",
        portoSilverMuted: "#7A8799",
      },
      boxShadow: {
        porto:
          "0 0 0 1px rgba(255,255,255,0.05), 0 18px 48px rgba(0,0,0,0.45)",
        "porto-hover":
          "0 0 0 1px rgba(0,86,179,0.2), 0 24px 64px rgba(0,0,0,0.5), 0 0 48px rgba(0,86,179,0.08)",
      },
      transitionTimingFunction: {
        porto: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      fontSize: {
        "porto-hero": [
          "clamp(4.25rem, 19vw, 24.75rem)",
          { lineHeight: "0.8", letterSpacing: "-0.1875rem" },
        ],
        "porto-display": [
          "clamp(2.25rem, 8.5vw, 7.5rem)",
          { lineHeight: "0.75", letterSpacing: "-0.1rem" },
        ],
        "porto-display-sm": [
          "clamp(1.5rem, 4.5vw, 3rem)",
          { lineHeight: "0.85", letterSpacing: "-0.06rem" },
        ],
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        /** Paragraph copy — Rajdhani (geometric / tech, closer to Jaxpat logotype) */
        jaxpat: [
          "var(--font-jaxpat-body)",
          "var(--font-inter)",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        display: [
          '"Clash Display"',
          "var(--font-inter)",
          "Inter",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
