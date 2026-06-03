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
const CURTAIN_MS = 900;
const EXIT_DELAY_MS = 120;
const EXIT_MS = 720;
const DONE_DELAY_MS = 320;

const MATRIX_CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲ0123456789ABCDEF<>/[]{}|=*+#$%&";

const GLITCH_WORD = "JAXPAT";
const randomizeCase = (word: string) =>
  word
    .split("")
    .map((c) => (Math.random() < 0.5 ? c.toUpperCase() : c.toLowerCase()))
    .join("");

type LoaderPhase = "pending" | "counting" | "curtain" | "exit" | "done";

export function SiteLoader() {
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = mounted && Boolean(prefersReducedMotion);

  const [phase, setPhase] = useState<LoaderPhase>("pending");
  /** After `dispatchLoaderComplete`, the header becomes interactive while this node may still exist for `DONE_DELAY_MS` — keep it from eating the first click. */
  const [releasePointer, setReleasePointer] = useState(false);
  const [progress, setProgress] = useState(0);
  const [glitchText, setGlitchText] = useState(GLITCH_WORD);

  const rootRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null);
  const glitchRef = useRef<HTMLDivElement>(null);
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
        { opacity: 0, scale: 0.82 },
        {
          opacity: 1,
          scale: 1,
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
    if (phase !== "curtain" && phase !== "exit") return;
    const canvas = matrixCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const fontSize = 16;
    let width = 0;
    let height = 0;
    let columns = 0;
    let drops: number[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.ceil(width / fontSize);
      drops = new Array(columns)
        .fill(0)
        .map(() => Math.floor(Math.random() * -40));
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px "JetBrains Mono", ui-monospace, monospace`;
      for (let i = 0; i < columns; i++) {
        const ch = MATRIX_CHARS.charAt(
          Math.floor(Math.random() * MATRIX_CHARS.length),
        );
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        const isHead = Math.random() < 0.015;
        ctx.fillStyle = isHead ? "#e8eef5" : "#1a7fed";
        if (isHead) ctx.shadowColor = "#1a7fed";
        ctx.shadowBlur = isHead ? 14 : 0;
        ctx.fillText(ch, x, y);
        ctx.shadowBlur = 0;
        if (y > height && Math.random() > 0.972) {
          drops[i] = 0;
        } else {
          drops[i] += 1;
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "curtain" || !curtainRef.current) return;

    const tl = gsap.timeline({ onComplete: () => setPhase("exit") });
    tl.fromTo(
      curtainRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: CURTAIN_MS / 1000,
        ease: "power2.out",
      },
    );

    const center = rootRef.current?.querySelector(
      ".site-loader-rahul-center",
    ) as HTMLElement | null;
    if (center) {
      tl.to(
        center,
        {
          opacity: 0,
          filter: "blur(4px)",
          duration: 0.35,
          ease: "power2.in",
        },
        0,
      );
    }

    if (glitchRef.current) {
      gsap.to(glitchRef.current, {
        opacity: 1,
        duration: 0.18,
        delay: 0.1,
      });
    }

    setGlitchText(randomizeCase(GLITCH_WORD));
    const scrambleId = window.setInterval(() => {
      setGlitchText(randomizeCase(GLITCH_WORD));
    }, 70);

    return () => {
      window.clearInterval(scrambleId);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "exit") return;

    const el = rootRef.current;
    const complete = () => {
      markLoaderComplete();
      dispatchLoaderComplete();
      setReleasePointer(true);
      window.setTimeout(() => setPhase("done"), DONE_DELAY_MS);
    };

    if (!el) {
      complete();
      return;
    }

    const tl = gsap.timeline({ onComplete: complete });
    tl.to(el, {
      keyframes: [
        { x: -8, skewX: 2, duration: 0.05 },
        { x: 10, skewX: -3, duration: 0.05 },
        { x: -6, skewX: 1.5, duration: 0.05 },
        { x: 4, skewX: -1, duration: 0.05 },
        { x: 0, skewX: 0, duration: 0.05 },
      ],
      ease: "steps(1)",
    })
      .to(
        el,
        {
          opacity: 0,
          duration: EXIT_MS / 1000,
          ease: "power2.in",
        },
        0.05,
      )
      .to(
        el,
        {
          scale: 1.04,
          duration: EXIT_MS / 1000,
          ease: "power3.in",
        },
        0.05,
      );
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
        className="site-loader-rahul-curtain pointer-events-none absolute inset-0 z-20"
        aria-hidden
        style={{ opacity: 0 }}
      >
        <canvas
          ref={matrixCanvasRef}
          className="site-loader-rahul-matrix-canvas"
          aria-hidden
        />
        <div className="site-loader-rahul-scanlines" aria-hidden />
        <div
          ref={glitchRef}
          className="site-loader-rahul-glitch"
          aria-hidden
          style={{ opacity: 0 }}
        >
          <span data-text={glitchText}>{glitchText}</span>
        </div>
      </div>
    </div>
  );
}
