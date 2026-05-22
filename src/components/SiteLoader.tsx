"use client";

import { CompanyLogo } from "@/components/CompanyLogo";
import { preloadLoaderAssets } from "@/lib/loader-assets";
import { easeOutCubic } from "@/lib/loader-easing";
import { stopLenis, startLenis } from "@/lib/lenis-control";
import {
  dispatchLoaderComplete,
  resetLoaderCompleteDispatched,
} from "@/lib/porto-events";
import {
  LOADER_NAME_LINE_1,
  LOADER_NAME_LINE_2,
  LOADER_ROLE_LINE_1,
  LOADER_ROLE_LINE_2,
} from "@/lib/site-brand";
import { clearLoaderSkipFlags, markLoaderComplete } from "@/lib/site-loader";
import { gsap } from "gsap";
import { useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

/** Shorter timeline = snappier first paint; counter still eases out smoothly */
const COUNTER_MS = 1750;
const CURTAIN_MS = 720;
const EXIT_DELAY_MS = 120;
const EXIT_MS = 820;
const DONE_DELAY_MS = 420;

type LoaderPhase = "pending" | "counting" | "curtain" | "exit" | "done";

export function SiteLoader() {
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = mounted && Boolean(prefersReducedMotion);

  const [phase, setPhase] = useState<LoaderPhase>("pending");
  /** After `dispatchLoaderComplete`, the header becomes interactive while this node may still exist for `DONE_DELAY_MS` — keep it from eating the first click. */
  const [releasePointer, setReleasePointer] = useState(false);
  const [progress, setProgress] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const assetRatioRef = useRef(0);
  const rafRef = useRef(0);

  useLayoutEffect(() => {
    clearLoaderSkipFlags();
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return;
    if (reduceMotion) {
      markLoaderComplete();
      setPhase("done");
      queueMicrotask(() => {
        dispatchLoaderComplete();
      });
      return;
    }
    resetLoaderCompleteDispatched();
    setPhase("counting");
  }, [mounted, reduceMotion]);

  useLayoutEffect(() => {
    if (phase === "counting" || phase === "curtain" || phase === "exit") {
      stopLenis();
      document.body.classList.add("is-loading");
      return () => document.body.classList.remove("is-loading");
    }
    if (phase === "done") {
      document.body.classList.remove("is-loading");
      startLenis();
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== "counting") return;

    void preloadLoaderAssets((ratio) => {
      assetRatioRef.current = ratio;
    });

    const started = performance.now();
    let cancelled = false;

    const tick = (now: number) => {
      if (cancelled) return;
      const elapsed = now - started;
      const t = Math.min(1, elapsed / COUNTER_MS);
      const eased = easeOutCubic(t);
      const loadBoost =
        document.readyState === "complete" && assetRatioRef.current >= 1
          ? 1
          : 0.88 + assetRatioRef.current * 0.1;
      setProgress(Math.min(100, Math.round(eased * 100 * loadBoost)));

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      setProgress(100);
      window.setTimeout(() => {
        if (!cancelled) setPhase("curtain");
      }, EXIT_DELAY_MS);
    };

    rafRef.current = requestAnimationFrame(tick);

    const logoEl = logoRef.current;
    if (logoEl) {
      gsap.fromTo(
        logoEl,
        { opacity: 0, scale: 0.82, filter: "blur(14px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.85,
          ease: "expo.out",
          delay: 0.05,
        },
      );
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "curtain" || !curtainRef.current) return;

    gsap.fromTo(
      curtainRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: CURTAIN_MS / 1000,
        ease: "power3.inOut",
        transformOrigin: "bottom center",
        onComplete: () => setPhase("exit"),
      },
    );
  }, [phase]);

  useEffect(() => {
    if (phase !== "exit") return;

    const el = rootRef.current;
    if (!el) {
      markLoaderComplete();
      dispatchLoaderComplete();
      setReleasePointer(true);
      window.setTimeout(() => setPhase("done"), DONE_DELAY_MS);
      return;
    }

    gsap.to(el, {
      yPercent: -100,
      duration: EXIT_MS / 1000,
      ease: "power4.inOut",
      onComplete: () => {
        markLoaderComplete();
        dispatchLoaderComplete();
        setReleasePointer(true);
        window.setTimeout(() => setPhase("done"), DONE_DELAY_MS);
      },
    });
  }, [phase]);

  if (!mounted || phase === "pending" || phase === "done") return null;

  return (
    <div
      ref={rootRef}
      role="status"
      aria-live="polite"
      aria-busy={phase !== "exit"}
      aria-label="Loading site"
      className={`site-loader-rahul fixed inset-0 z-[500] overflow-hidden bg-black text-white will-change-transform${releasePointer ? " pointer-events-none" : ""}`}
    >
      <div className="site-loader-rahul-grain pointer-events-none absolute inset-0" aria-hidden />

      <div className="site-loader-rahul-corner site-loader-rahul-corner-tl">
        <span className="site-loader-rahul-brand">{LOADER_NAME_LINE_1}</span>
        <span className="site-loader-rahul-brand site-loader-rahul-brand-offset">
          {LOADER_NAME_LINE_2}
        </span>
      </div>

      <div className="site-loader-rahul-corner site-loader-rahul-corner-tr">
        <span className="site-loader-rahul-meta">Loading</span>
        <span className="site-loader-rahul-meta">Assets</span>
      </div>

      <div className="site-loader-rahul-corner site-loader-rahul-corner-bl">
        <span className="site-loader-rahul-meta">© Jaxpat</span>
        <span className="site-loader-rahul-meta text-neutral-500">2026</span>
      </div>

      <div className="site-loader-rahul-corner site-loader-rahul-corner-br">
        <span className="site-loader-rahul-role">{LOADER_ROLE_LINE_1}</span>
        <span className="site-loader-rahul-role site-loader-rahul-brand-offset">
          {LOADER_ROLE_LINE_2}
        </span>
      </div>

      <div className="site-loader-rahul-center">
        <div ref={logoRef} className="site-loader-rahul-logo">
          <CompanyLogo variant="original" size={96} priority className="h-16 w-16 md:h-20 md:w-20" />
        </div>

        <p className="site-loader-rahul-start-label">start</p>
        <p className="site-loader-rahul-percent tabular-nums" aria-live="polite">
          {progress}
          <span className="site-loader-rahul-percent-suffix">%</span>
        </p>
        <p className="site-loader-rahul-subcopy">preparing the experience</p>

        <div className="site-loader-rahul-progress-track" aria-hidden>
          <span
            className="site-loader-rahul-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div
        ref={curtainRef}
        className="site-loader-rahul-curtain pointer-events-none absolute inset-0 z-20 bg-white"
        aria-hidden
        style={{ transform: "scaleY(0)", transformOrigin: "bottom center" }}
      />
    </div>
  );
}
