"use client";

import {
  COMPANY_EMAIL_PRIMARY,
  COMPANY_EMAIL_SECONDARY,
  COMPANY_NAME_UPPER,
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
        />
      </div>
      <button
        type="submit"
        className="mt-2 min-h-[48px] w-full touch-manipulation rounded-lg bg-white px-4 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-black transition hover:bg-neutral-200 active:bg-neutral-300"
      >
        Submit Now
      </button>
    </form>
  );
}

export default function ContactView() {
  return (
    <>
      <div className="relative z-10 border-b border-portoLine px-4 pb-[max(4rem,env(safe-area-inset-bottom,0px))] pt-[calc(5.25rem+env(safe-area-inset-top,0px))] sm:px-6 md:px-10 md:pb-24 md:pt-28">
        <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-16">
          <div>
            <h1 className="font-display text-[clamp(2.5rem,8vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-tight text-white">
              Ring a bell!
            </h1>
            <p className="porto-muted porto-body mt-6 max-w-lg">
              Tell us about AI integration, full-stack work, mobile, embedded
              systems, or VR/AR—we&apos;ll respond with next steps and a sensible
              discovery plan.
            </p>
            <p className="mt-12 font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-white">
              Fill this form out
            </p>
            <ContactForm />
          </div>

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
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-600/45 via-red-900/25 to-black/40"
              aria-hidden
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 border-b border-portoLine px-4 py-10 sm:px-6 md:px-10 md:py-12">
        <div className="mx-auto grid max-w-[1400px] gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
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
                >
                  Twitter <span aria-hidden>↗</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:border-r lg:border-portoLine lg:px-8">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white">
              Current location
            </p>
            <p className="porto-muted mt-6 text-sm font-medium uppercase leading-relaxed tracking-wide">
              41, Arunagiri Street, West Kamakoti Nagar, Valasaravakkam,
              Chennai, Tamil Nadu 600087
            </p>
          </div>

          <div className="lg:border-r lg:border-portoLine lg:px-8">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white">
              Phone
            </p>
            <div className="porto-muted mt-6 space-y-3 text-sm font-medium uppercase leading-relaxed">
              <p>+91 8122699058</p>
              <p>+91 7738057380</p>
            </div>
          </div>

          <div className="lg:pl-8">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white">
              Email me
            </p>
            <div className="porto-muted mt-6 space-y-3 text-sm font-medium uppercase leading-relaxed">
              <p>
                <a
                  href={`mailto:${COMPANY_EMAIL_PRIMARY}`}
                  className="hover:text-white"
                >
                  {COMPANY_EMAIL_PRIMARY}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${COMPANY_EMAIL_SECONDARY}`}
                  className="hover:text-white"
                >
                  {COMPANY_EMAIL_SECONDARY}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 px-4 py-12 sm:px-6 md:px-10 md:py-20">
        <h2 className="text-center">
          <span className="block font-display text-[clamp(4rem,min(20vw,26svh),26rem)] font-semibold uppercase leading-[0.82] tracking-[-0.08em] text-white sm:tracking-[-0.12em] md:tracking-[-0.16em]">
            Jaxpat
          </span>
          <span className="mt-1 block font-display text-[clamp(1.2rem,min(4.8vw,6svh),5.75rem)] font-semibold uppercase leading-[0.88] tracking-[-0.04em] text-[rgb(128,128,128)] md:mt-2 md:text-[clamp(1.35rem,min(4.2vw,7svh),6.5rem)]">
            Technology
          </span>
        </h2>
      </div>

      <footer className="relative z-10 border-t border-portoLine px-4 py-10 pb-[max(2.5rem,env(safe-area-inset-bottom,0px))] sm:px-6 md:px-10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-white sm:flex-row sm:items-center sm:justify-between md:text-[11px]">
          <p className="text-neutral-400">
            ©2026{" "}
            <Link
              href="/"
              className="text-white underline-offset-4 hover:underline"
            >
              {COMPANY_NAME_UPPER}
            </Link>
          </p>
          <Link
            href="/"
            className="inline-flex min-h-[44px] touch-manipulation items-center self-start rounded-full border border-white/15 px-5 py-2.5 text-neutral-300 transition hover:border-white/30 hover:text-white active:bg-white/[0.06] sm:self-auto sm:py-2"
          >
            Back To Home
          </Link>
        </div>
      </footer>
    </>
  );
}
