"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { portfolioItems } from "@/lib/data";
import { HoverWords } from "@/components/motion/HoverWords";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerItem, StaggerReveal } from "@/components/motion/StaggerReveal";
import { TiltCard } from "@/components/motion/TiltCard";
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
    const narrow =
      typeof window !== "undefined" && window.innerWidth < MD_MIN;
    const step = narrow ? 0.72 : 0.78;
    const minStep = narrow ? 220 : 280;
    const amount = Math.max(minStep, Math.floor(el.clientWidth * step));
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
      className="border-t border-portoLine porto-safe-x py-20 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <SectionLabel index="03" tag="Portfolio" eyebrow="Case studies" />
        </Reveal>
        <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal delay={0.05}>
            <div>
              <h2 className="font-display text-porto-display-sm font-semibold uppercase text-brand-secondary">
                <HoverWords as="span" byChar={false} text="Latest" />
              </h2>
              <h2 className="mt-2 font-display text-porto-display font-semibold uppercase text-white porto-lg:mt-1">
                <HoverWords as="span" byChar={false} text="Portfolio" />
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
                <MagneticButton
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => scrollByCards("prev")}
                  disabled={!canScrollPrev}
                  aria-label="Scroll portfolio left"
                >
                  <span aria-hidden className="text-xl leading-none">
                    ←
                  </span>
                </MagneticButton>
                <MagneticButton
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => scrollByCards("next")}
                  disabled={!canScrollNext}
                  aria-label="Scroll portfolio right"
                >
                  <span aria-hidden className="text-xl leading-none">
                    →
                  </span>
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>

        <StaggerReveal className="mt-14 min-w-0">
          <div
            ref={scrollerRef}
            onMouseDown={onScrollerMouseDown}
            className={`flex min-w-0 touch-pan-x gap-3 overflow-x-auto overscroll-x-contain pb-4 ps-0 pe-[max(1rem,env(safe-area-inset-right,0px))] [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-5 sm:pe-10 md:pe-12 [&::-webkit-scrollbar]:hidden snap-x snap-mandatory scroll-ps-2 scroll-pe-[max(1rem,env(safe-area-inset-right,0px))] sm:scroll-pe-10 md:scroll-pe-12 ${isDragging ? "cursor-grabbing select-none" : "md:cursor-grab"}`}
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {portfolioItems.map((item) => (
              <StaggerItem
                key={item.title}
                className="relative w-[min(420px,calc(100svw-2.25rem))] max-w-[min(420px,calc(100svw-2.25rem))] shrink-0 snap-start sm:w-[min(420px,calc(100svw-3rem))] sm:max-w-[min(420px,calc(100svw-3rem))] md:w-[min(420px,85vw)] md:max-w-[420px]"
              >
                <TiltCard
                  disabled={isDragging}
                  className="[perspective:1200px]"
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
                  <div className="relative aspect-[16/11] w-full shrink-0 overflow-hidden bg-zinc-950 sm:aspect-[16/10] md:aspect-video">
                    <div className="absolute inset-1.5 sm:inset-2.5">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        draggable={false}
                        className="object-cover object-center transition duration-700 ease-out group-hover:scale-[1.06] md:object-contain md:object-top"
                        sizes="(max-width: 768px) 90vw, 420px"
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
                </TiltCard>
              </StaggerItem>
            ))}
          </div>
        </StaggerReveal>
      </div>
    </section>
  );
}
