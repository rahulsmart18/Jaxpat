"use client";

import { framerSpring } from "@/lib/motion";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

function formatTime(d: Date) {
  return d.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

const PATTERN =
  "url(https://framerusercontent.com/images/ldf53R2pKtKErtQpdz1GxxWt2I.svg)";

const NAV_ITEMS = [
  { label: "HOME", href: "/" },
  { label: "WORK", href: "/#portfolio" },
  { label: "ABOUT", href: "/#about" },
  { label: "SERVICES", href: "/#services" },
  { label: "CONTACT", href: "/contact", muted: true },
] as const;

function MenuDotsTrigger({
  onOpen,
  expanded,
}: {
  onOpen: () => void;
  expanded: boolean;
}) {
  return (
    <button
      type="button"
      aria-expanded={expanded}
      aria-label="Open menu"
      onClick={onOpen}
      className="grid min-h-[44px] min-w-[44px] touch-manipulation place-items-center justify-self-center rounded-md p-2 transition-opacity hover:opacity-90 active:opacity-80"
    >
      <span className="grid grid-cols-2 gap-[5px]">
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className="h-[5px] w-[5px] rounded-full bg-white md:h-1.5 md:w-1.5"
          />
        ))}
      </span>
    </button>
  );
}

export function Header() {
  const [time, setTime] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const tick = () => setTime(formatTime(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  /** If the tab is refreshed or navigated away while the menu is open, avoid a stuck `overflow: hidden` body */
  useEffect(() => {
    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const smoothScrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return false;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const raf = window.requestAnimationFrame(() => {
      smoothScrollToId(hash);
    });
    return () => window.cancelAnimationFrame(raf);
  }, [pathname, smoothScrollToId]);

  const navigate = useCallback(
    (href: string) => {
      closeMenu();
      if (href.startsWith("/#")) {
        const id = href.slice(2);
        if (pathname === "/") {
          smoothScrollToId(id);
        } else {
          router.push(`/#${id}`, { scroll: false });
        }
        return;
      }
      router.push(href);
    },
    [closeMenu, pathname, router, smoothScrollToId],
  );

  return (
    <>
      {!menuOpen ? (
        <motion.header
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={framerSpring}
          className="fixed inset-x-0 top-0 z-[300] border-b border-white/10 bg-gradient-to-b from-black/55 via-black/35 to-black/20 pt-[env(safe-area-inset-top,0px)] shadow-[0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-2xl"
        >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: PATTERN,
                backgroundSize: "13px auto",
              }}
              aria-hidden
            />
            <div className="relative mx-auto grid min-h-[72px] max-w-[1600px] grid-cols-3 items-center px-4 py-2 md:min-h-[80px] md:px-10 md:py-0">
              <div className="flex items-center border-r border-portoLine py-3 pr-4 md:pr-8">
                <div className="font-sans text-[10px] uppercase leading-tight tracking-[0.22em] md:text-[11px]">
                  <span className="text-neutral-500">LOCAL/</span>{" "}
                  <span className="font-semibold tabular-nums text-white">
                    {time || "—"}
                  </span>
                </div>
              </div>

              <div className="flex justify-center border-r border-portoLine py-3">
                <MenuDotsTrigger
                  onOpen={() => setMenuOpen(true)}
                  expanded={menuOpen}
                />
              </div>

              <div className="flex justify-end pl-4 md:pl-8">
                <Link
                  href="/contact"
                  data-cursor-hover
                  className="inline-flex min-h-[44px] touch-manipulation items-center justify-center rounded-full border border-white/90 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white shadow-porto transition duration-500 ease-porto hover:border-portoAccent/50 hover:bg-white/[0.07] hover:shadow-porto-hover active:bg-white/[0.1] md:px-5 md:text-xs"
                >
                  CONTACT NOW
                </Link>
              </div>
            </div>
        </motion.header>
      ) : null}

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            key="overlay"
            initial={{
              opacity: 0,
              clipPath: "circle(0% at 50% 74px)",
              WebkitClipPath: "circle(0% at 50% 74px)",
            }}
            animate={{
              opacity: 1,
              clipPath: "circle(150% at 50% 74px)",
              WebkitClipPath: "circle(150% at 50% 74px)",
            }}
            exit={{
              opacity: 0,
              clipPath: "circle(0% at 50% 74px)",
              WebkitClipPath: "circle(0% at 50% 74px)",
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[350] flex flex-col bg-gradient-to-b from-zinc-950 via-black to-black"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: PATTERN,
                backgroundSize: "13px auto",
              }}
              aria-hidden
            />

            <div className="relative z-10 grid shrink-0 grid-cols-3 items-start border-b border-portoLine px-4 pb-6 pt-[max(1.5rem,env(safe-area-inset-top,0px))] md:px-10 md:pt-8">
              <p className="justify-self-start font-sans text-[10px] uppercase leading-relaxed tracking-[0.2em] md:text-[11px]">
                <span className="text-neutral-500">LOCAL/</span>{" "}
                <span className="text-white">46° 28&apos; 58.6272&quot; N</span>
              </p>
              <button
                type="button"
                aria-label="Close menu"
                onClick={closeMenu}
                className="justify-self-center flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded-md font-sans text-3xl font-light leading-none text-white transition hover:opacity-70 active:opacity-60 md:text-4xl"
              >
                ×
              </button>
              <div className="justify-self-end">
                <Link
                  href="/contact"
                  data-cursor-hover
                  onClick={closeMenu}
                  className="inline-flex min-h-[44px] touch-manipulation items-center justify-center rounded-full border border-white/90 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white shadow-porto transition duration-500 ease-porto hover:border-portoAccent/50 hover:bg-white/[0.07] hover:shadow-porto-hover active:bg-white/[0.1] md:px-5 md:text-xs"
                >
                  CONTACT NOW
                </Link>
              </div>
            </div>

            <nav className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center gap-0.5 overflow-y-auto px-4 py-6 overscroll-contain md:py-7">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    ...framerSpring,
                    delay: 0.16 + i * 0.06,
                  }}
                >
                  {item.href.startsWith("/#") ? (
                    <button
                      type="button"
                      onClick={() => navigate(item.href)}
                      className={`block w-full max-w-[min(100%,22rem)] touch-manipulation py-1 text-center font-display text-[clamp(1.55rem,7.6vh,4.9rem)] font-semibold uppercase leading-[0.9] tracking-[-0.04em] transition hover:opacity-80 sm:max-w-none sm:text-[clamp(1.8rem,7.2vh,5.2rem)] md:text-[clamp(2rem,7.2vh,5.4rem)] max-[780px]:text-[clamp(1.4rem,5.9vh,4rem)] ${
                        "muted" in item && item.muted
                          ? "text-neutral-500"
                          : "text-white"
                      }`}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      prefetch={
                        item.href === "/" || item.href.startsWith("/contact")
                      }
                      onClick={closeMenu}
                      className={`block w-full max-w-[min(100%,22rem)] touch-manipulation py-1 text-center font-display text-[clamp(1.55rem,7.6vh,4.9rem)] font-semibold uppercase leading-[0.9] tracking-[-0.04em] transition hover:opacity-80 sm:max-w-none sm:text-[clamp(1.8rem,7.2vh,5.2rem)] md:text-[clamp(2rem,7.2vh,5.4rem)] max-[780px]:text-[clamp(1.4rem,5.9vh,4rem)] ${
                        "muted" in item && item.muted
                          ? "text-neutral-500"
                          : "text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>

            <div className="relative z-10 flex flex-col gap-6 border-t border-portoLine px-4 pb-[max(2rem,env(safe-area-inset-bottom,0px))] pt-8 md:flex-row md:items-end md:justify-between md:px-10 md:pb-10 md:pt-10">
              <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-white md:text-[11px]">
                ©2024 ALL RIGHTS RESERVED
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 font-sans text-[10px] uppercase tracking-[0.28em] text-white md:gap-x-8 md:text-[11px]">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[44px] touch-manipulation items-center py-2 transition hover:opacity-70 active:opacity-60"
                >
                  INSTAGRAM ↗
                </a>
                <a
                  href="https://dribbble.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[44px] touch-manipulation items-center py-2 transition hover:opacity-70 active:opacity-60"
                >
                  DRIBBBLE ↗
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
