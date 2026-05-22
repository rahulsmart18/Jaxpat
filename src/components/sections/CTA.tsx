"use client";

import { HoverWords } from "@/components/motion/HoverWords";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { ShineLink } from "@/components/motion/ShineLink";
import { framerSpring } from "@/lib/motion";
import { motion } from "framer-motion";
import Link from "next/link";

export function CTA() {
  return (
    <section
      id="contact"
      className="border-t border-portoLine porto-safe-x py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <ParallaxLayer distance={36}>
          <div>
            <h2 className="font-display text-porto-display font-semibold uppercase leading-[0.85] text-balance">
              <HoverWords as="span" byChar text="Let's work" />
            </h2>
            <h2 className="font-display text-porto-display font-semibold uppercase leading-[0.85] text-balance">
              <HoverWords as="span" byChar text="together" />
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...framerSpring, delay: 0.12 }}
              className="mt-10"
            >
              <ShineLink href="/contact">Contact now</ShineLink>
            </motion.div>
          </div>
          </ParallaxLayer>
          <ParallaxLayer distance={28}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...framerSpring, delay: 0.1 }}
            className="space-y-8"
          >
            <p className="font-sans text-[11px] uppercase leading-relaxed tracking-[0.28em] text-neutral-500">
              BASED IN Chennai,
              <br />
              TAMIL NADU
            </p>
            <p className="text-sm font-medium uppercase leading-relaxed tracking-[0.12em] text-neutral-400 text-pretty">
              WE BUILD NEXT.JS + THREE.JS WEBSITES, ANDROID STUDIO + FLUTTER
              APPS, RAG-ENABLED AI WORKFLOWS, AND CLOUD-READY FULL-STACK SYSTEMS
            </p>
            <p className="text-sm font-medium uppercase leading-relaxed tracking-[0.12em] text-neutral-400 text-pretty">
              WITH MONGODB ATLAS, SUPABASE, AND VR/AR DELIVERY FROM PROTOTYPE TO
              PRODUCTION.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 font-sans text-xs uppercase tracking-[0.2em] text-neutral-400">
              <Link
                href="https://www.instagram.com/"
                className="inline-flex min-h-[44px] touch-manipulation items-center py-2 hover:text-white active:text-white"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </Link>
              <Link
                href="https://dribbble.com/"
                className="inline-flex min-h-[44px] touch-manipulation items-center py-2 hover:text-white active:text-white"
                target="_blank"
                rel="noreferrer"
              >
                Dribbble
              </Link>
              <Link
                href="https://x.com/"
                className="inline-flex min-h-[44px] touch-manipulation items-center py-2 hover:text-white active:text-white"
                target="_blank"
                rel="noreferrer"
              >
                Twitter
              </Link>
            </div>
          </motion.div>
          </ParallaxLayer>
        </div>
      </div>
    </section>
  );
}
