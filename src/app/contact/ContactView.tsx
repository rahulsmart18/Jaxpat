"use client";

import { HoverWords } from "@/components/motion/HoverWords";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import {
  COMPANY_EMAIL_PRIMARY,
  COMPANY_EMAIL_SECONDARY,
  FOOTER_COPYRIGHT,
} from "@/lib/site-brand";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:${COMPANY_EMAIL_PRIMARY}?subject=Contact&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div>
        <label
          htmlFor="contact-name"
          className="mb-2 block font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500"
        >
          Name
        </label>
        <input
          id="contact-name"
          required
          type="text"
          name="name"
          autoComplete="name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="min-h-[48px] w-full rounded-lg border border-portoLine bg-portoPanel px-4 py-3 text-base text-white placeholder:text-neutral-500 outline-none transition focus:border-white/40 md:text-sm"
          data-cursor-hover
        />
      </div>
      <div>
        <label
          htmlFor="contact-email"
          className="mb-2 block font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500"
        >
          Email
        </label>
        <input
          id="contact-email"
          required
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="min-h-[48px] w-full rounded-lg border border-portoLine bg-portoPanel px-4 py-3 text-base text-white placeholder:text-neutral-500 outline-none transition focus:border-white/40 md:text-sm"
          data-cursor-hover
        />
      </div>
      <div>
        <label
          htmlFor="contact-message"
          className="mb-2 block font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          required
          name="message"
          rows={5}
          placeholder="How can we help?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-[140px] w-full resize-y rounded-lg border border-portoLine bg-portoPanel px-4 py-3 text-base text-white placeholder:text-neutral-500 outline-none transition focus:border-white/40 md:text-sm"
          data-cursor-hover
        />
      </div>
      <MagneticButton
        type="submit"
        variant="light"
        magneticPull
        className="mt-2 w-full rounded-lg text-sm tracking-[0.15em]"
      >
        Submit Now
      </MagneticButton>
    </form>
  );
}

export default function ContactView() {
  return (
    <>
      <div className="relative z-10 border-b border-portoLine porto-safe-x-loose pb-[max(4rem,env(safe-area-inset-bottom,0px))] pt-[calc(4.75rem+env(safe-area-inset-top,0px))] md:pb-24 md:pt-[calc(5.5rem+env(safe-area-inset-top,0px))]">
        <div className="mx-auto grid max-w-[1400px] min-w-0 gap-14 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-16">
          <div>
            <Reveal>
              <h1 className="font-display text-[clamp(2.5rem,8vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-tight">
                <HoverWords
                  as="span"
                  byChar={false}
                  text="Ring a bell!"
                />
              </h1>
            </Reveal>
            <div className="mt-5">
              <Link
                href="/"
                className="inline-flex min-h-[44px] items-center font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80 underline-offset-4 transition hover:text-white hover:underline"
              >
                ← Back to home
              </Link>
            </div>
            <Reveal delay={0.06}>
              <p className="porto-muted porto-body mt-6 max-w-lg">
                Tell us about AI integration, full-stack work, mobile, embedded
                systems, or VR/AR—we&apos;ll respond with next steps and a sensible
                discovery plan.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-12 font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-white">
                Fill this form out
              </p>
              <ContactForm />
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <ParallaxLayer distance={48}>
              <TiltCard intensity={8} className="[perspective:1200px]">
                <div className="relative mx-auto aspect-square w-full max-w-[520px] overflow-hidden rounded-2xl border border-portoLine lg:mx-0 lg:max-w-none">
                  <Image
                    src="/technology.jpg"
                    alt="Technology"
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 90vw, 50vw"
                    priority
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-neutral-900/20 to-transparent"
                    aria-hidden
                  />
                </div>
              </TiltCard>
            </ParallaxLayer>
          </Reveal>
        </div>
      </div>

      <div className="relative z-10 border-b border-portoLine porto-safe-x-loose py-10 md:py-12">
        <div className="mx-auto grid max-w-[1400px] gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          <Reveal>
            <div className="lg:border-r lg:border-portoLine lg:pr-8">
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white">
                Follow me
              </p>
              <ul className="mt-6 space-y-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white">
                <li>
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 hover:opacity-80"
                    data-cursor-hover
                  >
                    Instagram <span aria-hidden>↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://dribbble.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 hover:opacity-80"
                    data-cursor-hover
                  >
                    Dribbble <span aria-hidden>↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 hover:opacity-80"
                    data-cursor-hover
                  >
                    Twitter <span aria-hidden>↗</span>
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="lg:border-r lg:border-portoLine lg:px-8">
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white">
                Current location
              </p>
              <p className="porto-muted mt-6 text-sm font-medium uppercase leading-relaxed tracking-wide">
                41, Arunagiri Street, West Kamakoti Nagar, Valasaravakkam,
                Chennai, Tamil Nadu 600087
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="lg:border-r lg:border-portoLine lg:px-8">
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white">
                Phone
              </p>
              <div className="porto-muted mt-6 space-y-3 text-sm font-medium uppercase leading-relaxed">
                <p>+91 8122699058</p>
                <p>+91 7738057380</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="lg:pl-8">
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white">
                Email me
              </p>
              <div className="porto-muted mt-6 space-y-3 text-sm font-medium uppercase leading-relaxed">
                <p>
                  <a
                    href={`mailto:${COMPANY_EMAIL_PRIMARY}`}
                    className="hover:text-white"
                    data-cursor-hover
                  >
                    {COMPANY_EMAIL_PRIMARY}
                  </a>
                </p>
                <p>
                  <a
                    href={`mailto:${COMPANY_EMAIL_SECONDARY}`}
                    className="hover:text-white"
                    data-cursor-hover
                  >
                    {COMPANY_EMAIL_SECONDARY}
                  </a>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative z-10 overflow-x-clip porto-safe-x-loose py-12 md:py-20">
        <Reveal>
          <ParallaxLayer distance={32} className="text-center">
            <h2>
              <span className="mx-auto block max-w-full break-words font-display text-[clamp(2.85rem,min(18vw,22svh),26rem)] font-semibold uppercase leading-[0.82] tracking-[-0.08em] sm:text-[clamp(3.5rem,min(19vw,24svh),26rem)] sm:tracking-[-0.12em] md:text-[clamp(4rem,min(20vw,26svh),26rem)] md:tracking-[-0.16em]">
                <HoverWords
                  as="span"
                  byChar
                  text="Jaxpat"
                  className="font-display text-[clamp(2.85rem,min(18vw,22svh),26rem)] font-semibold uppercase leading-[0.82] tracking-[-0.08em] sm:text-[clamp(3.5rem,min(19vw,24svh),26rem)] sm:tracking-[-0.12em] md:text-[clamp(4rem,min(20vw,26svh),26rem)] md:tracking-[-0.16em]"
                />
              </span>
            </h2>
          </ParallaxLayer>
        </Reveal>
      </div>

      <footer className="relative z-10 border-t border-portoLine porto-safe-x-loose py-10 pb-[max(2.5rem,env(safe-area-inset-bottom,0px))]">
        <p className="porto-muted text-center font-jaxpat text-[11px] font-medium tracking-[0.14em] text-neutral-500 md:text-xs">
          {FOOTER_COPYRIGHT}
        </p>
      </footer>
    </>
  );
}
