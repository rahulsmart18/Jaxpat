"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { portfolioItems } from "@/lib/data";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import Image from "next/image";
import Link from "next/link";

const MD_MIN = 768;

export function Portfolio() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const suppressLinkClick = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    setCanScrollPrev(el.scrollLeft > 4);
    setCanScrollNext(el.scrollLeft < maxScrollLeft - 4);
  }, []);

  const onScrollerMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    if (typeof window !== "undefined" && window.innerWidth < MD_MIN) return;

    const el = scrollerRef.current;
    if (!el) return;

    const startX = e.clientX;
    const startScrollLeft = el.scrollLeft;
    let moved = false;

    const onMove = (ev: MouseEvent) => {
      const dx = ev.clientX - startX;
      if (Math.abs(dx) > 3) moved = true;
      el.scrollLeft = startScrollLeft - dx;
    };

    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      setIsDragging(false);
      if (moved) suppressLinkClick.current = true;
    };

    setIsDragging(true);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, []);

  const scrollByCards = useCallback((direction: "prev" | "next") => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.max(280, Math.floor(el.clientWidth * 0.78));
    el.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const onDocClickCapture = (e: MouseEvent) => {
      if (!suppressLinkClick.current) return;
      const path = e.composedPath();
      const hitLink = path.some(
        (n) => n instanceof HTMLElement && n.closest("a[data-portfolio-card]")
      );
      if (hitLink) {
        e.preventDefault();
        e.stopPropagation();
      }
      suppressLinkClick.current = false;
    };
    document.addEventListener("click", onDocClickCapture, true);
    return () => document.removeEventListener("click", onDocClickCapture, true);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateScrollState();

    const onScroll = () => updateScrollState();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [updateScrollState]);

  return (
    <section
      id="portfolio"
      className="border-t border-portoLine px-4 py-20 sm:px-6 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <SectionLabel index="03" tag="Portfolio" eyebrow="Case studies" />
        </Reveal>
        <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal delay={0.05}>
            <div>
              <h2 className="font-display text-porto-display-sm font-semibold uppercase text-[rgb(128,128,128)]">
                Latest
              </h2>
              <h2 className="mt-2 font-display text-porto-display font-semibold uppercase text-white porto-lg:mt-1">
                Portfolio
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col items-start gap-5 md:items-end">
              <p className="porto-body porto-muted max-w-md md:text-right">
                Selected work across AI integration, full-stack platforms, mobile
                apps, embedded systems, and immersive VR/AR—representative of
                how we scope, build, and ship with your team.
              </p>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => scrollByCards("prev")}
                  disabled={!canScrollPrev}
                  aria-label="Scroll portfolio left"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition hover:border-portoAccent/45 hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <span aria-hidden className="text-xl leading-none">
                    ←
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollByCards("next")}
                  disabled={!canScrollNext}
                  aria-label="Scroll portfolio right"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition hover:border-portoAccent/45 hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <span aria-hidden className="text-xl leading-none">
                    →
                  </span>
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.05} className="mt-14">
          <div
            ref={scrollerRef}
            onMouseDown={onScrollerMouseDown}
            className={`flex touch-pan-x gap-5 overflow-x-auto overscroll-x-contain pb-4 pl-0 pr-6 [-ms-overflow-style:none] [scrollbar-width:none] sm:pr-10 md:pr-12 [&::-webkit-scrollbar]:hidden snap-x snap-mandatory scroll-pl-4 scroll-pr-6 sm:scroll-pr-10 md:scroll-pr-12 ${isDragging ? "cursor-grabbing select-none" : "md:cursor-grab"}`}
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {portfolioItems.map((item) => (
              <div
                key={item.title}
                className="relative w-[min(85vw,420px)] max-w-[420px] flex-shrink-0 snap-start"
              >
                <Link
                  data-cursor-hover
                  data-portfolio-card
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  draggable={false}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-portoLine bg-portoPanel shadow-porto transition duration-500 ease-porto hover:border-portoAccent/25 hover:shadow-porto-hover"
                >
                  <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-zinc-950 md:aspect-video">
                    <div className="absolute inset-2 sm:inset-2.5">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        draggable={false}
                        className="object-contain object-top transition duration-700 ease-out group-hover:scale-[1.02]"
                        sizes="(max-width:768px) 85vw, 420px"
                      />
                    </div>
                  </div>
                  <div className="border-t border-portoLine bg-black/90 px-5 py-4">
                    <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/55">
                      {item.category}
                    </p>
                    <p className="mt-1.5 font-display text-xl text-white md:text-2xl">
                      {item.title}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
