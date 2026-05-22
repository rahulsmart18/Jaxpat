"use client";

import { framerSpring } from "@/lib/motion";
import { motion } from "framer-motion";
import Link from "next/link";

export function CTA() {
  return (
    <section
      id="contact"
      className="border-t border-portoLine px-4 py-24 sm:px-6 md:px-8 md:py-36"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={framerSpring}
              className="font-display text-porto-display font-semibold uppercase leading-[0.85] text-white"
            >
              Let&apos;S WORK
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...framerSpring, delay: 0.06 }}
              className="font-display text-porto-display font-semibold uppercase leading-[0.85] text-[rgb(128,128,128)]"
            >
              TOGETHER
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...framerSpring, delay: 0.12 }}
              className="mt-10"
            >
              <Link
                href="/contact"
                className="inline-flex min-h-[48px] touch-manipulation items-center justify-center rounded-full border border-white/25 bg-white/[0.06] px-8 py-3.5 text-xs font-medium uppercase tracking-[0.25em] text-white shadow-porto transition duration-500 ease-porto hover:border-portoAccent/45 hover:bg-white/[0.1] hover:shadow-porto-hover active:bg-white/[0.14]"
              >
                CONTACT NOW
              </Link>
            </motion.div>
          </div>
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
            <p className="text-sm font-medium uppercase tracking-[0.12em] text-neutral-400">
              WE BUILD NEXT.JS + THREE.JS WEBSITES, ANDROID STUDIO + FLUTTER
              APPS, RAG-ENABLED AI WORKFLOWS, AND CLOUD-READY FULL-STACK SYSTEMS
            </p>
            <p className="text-sm font-medium uppercase tracking-[0.12em] text-neutral-400">
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
        </div>
      </div>
    </section>
  );
}
