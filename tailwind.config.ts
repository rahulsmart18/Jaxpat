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
        /** Aligned with Framer breakpoints from Porto.html */
        porto: "810px",
        "porto-lg": "1200px",
        "porto-xl": "1440px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        /** Dividers / hairlines — slightly lifted for clarity on true black */
        portoLine: "rgb(30, 30, 32)",
        portoPanel: "rgb(12, 12, 14)",
        /** Accent used for hovers, labels, focus (pairs with custom cursor) */
        portoAccent: "#5eead4",
        portoAccentMuted: "rgba(94, 234, 212, 0.45)",
      },
      boxShadow: {
        /** Soft lift on cards / pills */
        porto:
          "0 0 0 1px rgba(255,255,255,0.05), 0 18px 48px rgba(0,0,0,0.35)",
        "porto-hover":
          "0 0 0 1px rgba(94,234,212,0.12), 0 20px 56px rgba(0,0,0,0.4), 0 0 40px rgba(94,234,212,0.06)",
      },
      transitionTimingFunction: {
        porto: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      fontSize: {
        /** Clash ~397px desktop, lh 0.8, -3px tracking (Framer SSR) */
        "porto-hero": [
          "clamp(4.25rem, 19vw, 24.75rem)",
          { lineHeight: "0.8", letterSpacing: "-0.1875rem" },
        ],
        /** Clash 120px / lh 90px, -1.6px (preset 1ejc4kd) */
        "porto-display": [
          "clamp(2.75rem, 9vw, 7.5rem)",
          { lineHeight: "0.75", letterSpacing: "-0.1rem" },
        ],
        /** Secondary display (e.g. “Latest”) */
        "porto-display-sm": [
          "clamp(1.75rem, 4vw, 3rem)",
          { lineHeight: "0.85", letterSpacing: "-0.06rem" },
        ],
      },
      fontFamily: {
        /** Published template body: Inter Display 18/22 medium */
        sans: [
          '"Inter Display"',
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
