/**
 * Image URLs from the published Framer template (framerusercontent.com).
 * Stable CDN — avoids Unsplash 404s from deprecated or mistyped photo IDs.
 */
const base = "https://framerusercontent.com/images";

export const framerImages = {
  /** Hero — large portrait / editorial */
  heroPortrait: `${base}/QDcJB2OLe3UAxM2RM7hyw8eeCo.jpg`,
  /** About — editorial portrait */
  aboutPortrait: `${base}/fgWEhtkY7w3HZA3XVtRwhpYRquM.jpg`,
  /** Portfolio covers */
  portfolio: {
    seventySeven: `${base}/JgEpdaKOH8MWK0dsFYloEuWQA.jpg`,
    scrambler: `${base}/dDIcbbzjaYqXw6P9Sb6Y8Lvpjg.jpg`,
    zudioGarage: `${base}/h3KeQCZx6YUlMZeOcfLNerruCyU.jpg`,
    flakestake: `${base}/7hPo6r1ptuNISyOzYBdu8c3owo.jpg`,
    ruralArena: `${base}/Bw2AqEPPasNjK5QoYFfYTYHloU.jpg`,
  },
  /** Voice section — 2×2 grid */
  voiceGallery: [
    `${base}/4GeZH9tDnTqh21vfDk8tqPUurU.jpg`,
    `${base}/5Vg5yv5EupF47u9k0JSlIej05kk.jpg`,
    `${base}/TwPnCUkRbYkKlfJL4ZCaWKgdY.jpg`,
    `${base}/xcxQQ1waNtZJqJFNv1uOoAOs.jpg`,
  ],
  /** Testimonial avatars — order matches `testimonials` in data.ts */
  testimonialAvatars: [
    `${base}/VX1rSkalWuRIsRIh7yoySMaSpWU.jpg`,
    `${base}/edesi3zrngnOaaFS0ZO0deHO8W0.jpg`,
    `${base}/seEwpz5cPd217YXOWnnDJmEN9cc.jpg`,
    `${base}/wmM20qqnTjuC9hBR1y7Xi8ytm58.jpg`,
    `${base}/4uPwYzqbqkMg9GbWQ1AtACS0bTA.jpg`,
    `${base}/3H1oi68O9SQYJGq1kE0qE33ld0.jpg`,
  ],
} as const;
