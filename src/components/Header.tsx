"use client";

import { CompanyLogo } from "@/components/CompanyLogo";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { PremiumMenu } from "@/components/nav/PremiumMenu";
import { useLoaderComplete } from "@/hooks/useLoaderComplete";
import { isPremiumMenuDisabledForPath } from "@/lib/premium-menu-paths";
import { portoEase } from "@/lib/motion";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

function formatTime(d: Date) {
  return d.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

/** Four dots ↔ X — shared center, minimal crossfade + scale */
function MenuTriggerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-[18px] w-[18px] items-center justify-center md:h-5 md:w-5">
      <motion.span
        className="absolute grid grid-cols-2 gap-[5px] [place-items:center]"
        aria-hidden
        initial={false}
        animate={{
          opacity: open ? 0 : 1,
          scale: open ? 0.5 : 1,
          rotate: open ? 45 : 0,
        }}
        transition={{ duration: 0.34, ease: portoEase }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className="h-[5px] w-[5px] rounded-full bg-white/90 md:h-1.5 md:w-1.5"
          />
        ))}
      </motion.span>
      <motion.span
        className="absolute inset-0 flex items-center justify-center"
        aria-hidden
        initial={false}
        animate={{
          opacity: open ? 1 : 0,
          scale: open ? 1 : 0.55,
        }}
        transition={{ duration: 0.28, ease: portoEase, delay: open ? 0.05 : 0 }}
      >
        <motion.span
          className="absolute h-[1.5px] w-[19px] rounded-full bg-white md:h-[2px] md:w-[21px]"
          initial={false}
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.34, ease: portoEase }}
        />
        <motion.span
          className="absolute h-[1.5px] w-[19px] rounded-full bg-white md:h-[2px] md:w-[21px]"
          initial={false}
          animate={{ rotate: open ? -45 : 0 }}
          transition={{ duration: 0.34, ease: portoEase }}
        />
      </motion.span>
    </span>
  );
}

export function Header() {
  const loaderDone = useLoaderComplete();
  const [time, setTime] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement | null>(null);
  /**
   * If mouseup lands on the overlay (not the trigger), the browser may not emit a `click`
   * on the button — opening on pointerdown avoids a "dead" first gesture.
   * When we open that way, suppress the following click so it doesn't immediately toggle closed.
   */
  const suppressMenuTriggerClickRef = useRef(false);
  const suppressMenuTriggerClickTimerRef = useRef<number | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const menuDisabled = isPremiumMenuDisabledForPath(pathname);

  useEffect(() => {
    return () => {
      if (suppressMenuTriggerClickTimerRef.current) {
        window.clearTimeout(suppressMenuTriggerClickTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (menuDisabled && menuOpen) setMenuOpen(false);
  }, [menuDisabled, menuOpen]);

  useEffect(() => {
    const tick = () => setTime(formatTime(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

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
      <motion.header
        initial={{ y: -40, opacity: 0, filter: "blur(8px)" }}
        animate={
          loaderDone
            ? { y: 0, opacity: 1, filter: "blur(0px)" }
            : { y: -40, opacity: 0, filter: "blur(8px)" }
        }
        transition={{ duration: 0.85, ease: portoEase, delay: 0.15 }}
        className="porto-nav fixed inset-x-0 top-0 z-[300] isolate pt-[env(safe-area-inset-top,0px)] text-white"
      >
        <div
          className="porto-nav-dark-glass pointer-events-none absolute inset-0"
          aria-hidden
        />
        <div className="relative z-10 mx-auto grid min-h-[64px] max-w-[1600px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center ps-[max(1rem,env(safe-area-inset-left,0px))] pe-[max(1rem,env(safe-area-inset-right,0px))] py-2 md:min-h-[72px] md:px-8 md:py-2.5 lg:min-h-[76px]">
          <div className="flex min-w-0 items-center gap-2.5 border-r border-white/[0.08] py-2 pr-2.5 md:gap-3 md:pr-6">
            <CompanyLogo
              variant="original"
              size={36}
              priority
              glow
              className="h-8 w-8 shrink-0 md:h-9 md:w-9"
            />
            <div className="hidden font-sans text-[10px] uppercase leading-tight tracking-[0.22em] text-neutral-500 sm:block md:text-[11px]">
              <span>LOCAL/</span>{" "}
              <span className="font-semibold tabular-nums text-white/90">
                {time || "—"}
              </span>
            </div>
          </div>

          <div className="flex shrink-0 justify-center border-r border-white/[0.08] px-2 py-2 md:px-5">
            {menuDisabled ? (
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center md:h-11 md:w-11"
                aria-hidden
              />
            ) : (
              <MagneticButton
                ref={menuTriggerRef}
                type="button"
                variant="ghost"
                size="icon"
                aria-expanded={menuOpen}
                aria-haspopup="dialog"
                aria-controls={menuOpen ? "premium-menu-dialog" : undefined}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onPointerDown={(e) => {
                  if (menuOpen) return;
                  if (e.button !== 0) return;
                  suppressMenuTriggerClickRef.current = true;
                  setMenuOpen(true);
                  if (suppressMenuTriggerClickTimerRef.current) {
                    window.clearTimeout(suppressMenuTriggerClickTimerRef.current);
                  }
                  suppressMenuTriggerClickTimerRef.current = window.setTimeout(
                    () => {
                      suppressMenuTriggerClickRef.current = false;
                      suppressMenuTriggerClickTimerRef.current = null;
                    },
                    450,
                  );
                }}
                onClick={(e) => {
                  const suppressed = suppressMenuTriggerClickRef.current;
                  if (suppressed) {
                    suppressMenuTriggerClickRef.current = false;
                    if (suppressMenuTriggerClickTimerRef.current) {
                      window.clearTimeout(
                        suppressMenuTriggerClickTimerRef.current,
                      );
                      suppressMenuTriggerClickTimerRef.current = null;
                    }
                    e.preventDefault();
                    return;
                  }
                  setMenuOpen((o) => !o);
                }}
                className={`${menuOpen ? "border-white/40 bg-white/[0.08]" : ""} h-10 w-10 md:h-11 md:w-11`}
              >
                <MenuTriggerIcon open={menuOpen} />
              </MagneticButton>
            )}
          </div>

          <div className="flex min-w-0 justify-end ps-2.5 md:ps-6">
            <MagneticButton
              href="/contact"
              size="sm"
              magneticPull={pathname === "/contact"}
              className="max-w-full min-w-0 min-h-10 px-4 py-2 text-[11px] font-semibold uppercase leading-none tracking-[0.18em] md:min-h-[42px] md:px-5 md:text-[13px] md:tracking-[0.2em]"
            >
              <span className="sm:hidden">Contact</span>
              <span className="hidden sm:inline">Contact now</span>
            </MagneticButton>
          </div>
        </div>
      </motion.header>

      {!menuDisabled && (
        <PremiumMenu
          open={menuOpen}
          onClose={closeMenu}
          onNavigate={navigate}
          returnFocusRef={menuTriggerRef}
        />
      )}
    </>
  );
}
