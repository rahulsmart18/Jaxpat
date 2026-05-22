"use client";

import { CompanyLogo } from "@/components/CompanyLogo";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { framerSpring } from "@/lib/motion";
import {
  COMPANY_ADDRESS_LINES,
  COMPANY_EMAIL_PRIMARY,
  COMPANY_EMAIL_SECONDARY,
  COMPANY_NAME,
  COMPANY_PHONES,
  FOOTER_COPYRIGHT,
  FOOTER_SOCIAL_LINKS,
  FOOTER_TAGLINE,
} from "@/lib/site-brand";
import { motion } from "framer-motion";
import Link from "next/link";

const FOOTER_NAV = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#portfolio" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/contact" },
] as const;

function FooterHeading({ children }: { children: string }) {
  return (
    <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
      {children}
    </p>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-portoLine bg-gradient-to-b from-zinc-950 via-black to-black porto-safe-x-loose pb-[max(2rem,env(safe-area-inset-bottom,0px))] pt-14 md:pt-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "url(https://framerusercontent.com/images/ldf53R2pKtKErtQpdz1GxxWt2I.svg)",
          backgroundSize: "13px auto",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={framerSpring}
          className="grid gap-12 border-b border-portoLine pb-12 md:grid-cols-2 md:gap-14 lg:grid-cols-12 lg:gap-10 lg:pb-14"
        >
          {/* Brand */}
          <div className="flex flex-col gap-5 lg:col-span-5">
            <Link
              href="/"
              className="inline-flex w-fit items-center gap-4 transition-opacity hover:opacity-90"
              data-cursor-hover
            >
              <CompanyLogo
                variant="original"
                href={null}
                size={52}
                glow
                className="footer-brand-logo h-12 w-12 md:h-14 md:w-14"
              />
              <span className="font-display text-2xl font-semibold uppercase tracking-tight text-white md:text-3xl">
                {COMPANY_NAME}
              </span>
            </Link>
            <p className="porto-body porto-muted max-w-md text-pretty text-sm leading-relaxed md:text-base">
              {FOOTER_TAGLINE}
            </p>
          </div>

          {/* Navigate */}
          <nav
            className="flex flex-col gap-5 lg:col-span-2"
            aria-label="Footer navigation"
          >
            <FooterHeading>Navigate</FooterHeading>
            <ul className="flex flex-col gap-3">
              {FOOTER_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-sans text-[13px] font-medium uppercase tracking-[0.16em] text-neutral-400 transition-colors hover:text-white"
                    data-cursor-hover
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-5 lg:col-span-3">
            <FooterHeading>Contact</FooterHeading>
            <div className="flex flex-col gap-4 font-sans text-[13px] font-medium uppercase leading-relaxed tracking-[0.12em] text-neutral-400">
              <p className="max-w-xs normal-case leading-relaxed tracking-normal text-neutral-500">
                {COMPANY_ADDRESS_LINES.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <div className="flex flex-col gap-2">
                {COMPANY_PHONES.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="w-fit text-white/90 transition-colors hover:text-white"
                    data-cursor-hover
                  >
                    {phone}
                  </a>
                ))}
              </div>
              <div className="flex flex-col gap-2 normal-case tracking-normal">
                <a
                  href={`mailto:${COMPANY_EMAIL_PRIMARY}`}
                  className="w-fit lowercase text-white/90 transition-colors hover:text-white"
                  data-cursor-hover
                >
                  {COMPANY_EMAIL_PRIMARY}
                </a>
                <a
                  href={`mailto:${COMPANY_EMAIL_SECONDARY}`}
                  className="w-fit lowercase text-white/90 transition-colors hover:text-white"
                  data-cursor-hover
                >
                  {COMPANY_EMAIL_SECONDARY}
                </a>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-5 lg:col-span-2">
            <FooterHeading>Connect</FooterHeading>
            <ul className="flex flex-col gap-3">
              {FOOTER_SOCIAL_LINKS.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-sans text-[13px] font-medium uppercase tracking-[0.16em] text-neutral-400 transition-colors hover:text-white"
                    data-cursor-hover
                  >
                    {s.label}
                    <span aria-hidden className="text-[11px] opacity-70">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...framerSpring, delay: 0.06 }}
          className="flex flex-col items-center justify-between gap-6 pt-10 md:flex-row md:pt-12"
        >
          <p className="porto-muted text-center font-jaxpat text-[11px] font-medium tracking-[0.14em] text-neutral-500 md:text-left md:text-xs md:tracking-[0.16em]">
            {FOOTER_COPYRIGHT}
          </p>
          <MagneticButton
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-[10px] tracking-[0.22em] text-neutral-400 md:text-[11px]"
          >
            Back to top
          </MagneticButton>
        </motion.div>
      </div>
    </footer>
  );
}
