"use client";

import { CompanyLogo } from "@/components/CompanyLogo";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { MenuNavLink } from "@/components/nav/MenuNavLink";
import { stopLenis, startLenis } from "@/lib/lenis-control";
import { portoEase } from "@/lib/motion";
import { AnimatePresence, motion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";

const NAV_ITEMS = [
  { label: "HOME", href: "/" },
  { label: "WORK", href: "/#portfolio" },
  { label: "ABOUT", href: "/#about" },
  { label: "SERVICES", href: "/#services" },
  { label: "CONTACT", href: "/contact", muted: true },
] as const;

const FOCUSABLE_SELECTOR =
  'button:not([disabled]):not([tabindex="-1"]), a[href]:not([tabindex="-1"]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

type PremiumMenuProps = {
  open: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
  /** Focus returns here when the menu closes (e.g. menu trigger button). */
  returnFocusRef?: RefObject<HTMLElement | null>;
};

export function PremiumMenu({
  open,
  onClose,
  onNavigate,
  returnFocusRef,
}: PremiumMenuProps) {
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<Element | null>(null);
  /** Same pointer gesture that opened the menu can finish on overlay controls (e.g. center close). */
  const closeSuppressUntilRef = useRef(0);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) {
      closeSuppressUntilRef.current = 0;
      return;
    }
    closeSuppressUntilRef.current = performance.now() + 280;
  }, [open]);

  const requestClose = useCallback(() => {
    const until = closeSuppressUntilRef.current;
    if (until > 0 && performance.now() < until) {
      return;
    }
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    stopLenis();
    const prev = document.body.style.overflow;
    document.body.classList.add("menu-open");
    document.body.style.overflow = "hidden";
    return () => {
      document.body.classList.remove("menu-open");
      document.body.style.overflow = prev;
      startLenis();
    };
  }, [open]);

  const getFocusable = useCallback((): HTMLElement[] => {
    const root = dialogRef.current;
    if (!root) return [];
    return [...root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)].filter(
      (el) => {
        if (el.closest("[aria-hidden='true']")) return false;
        if (el.getAttribute("aria-hidden") === "true") return false;
        const style = window.getComputedStyle(el);
        if (style.visibility === "hidden" || style.display === "none")
          return false;
        return true;
      },
    );
  }, []);

  useEffect(() => {
    if (!open) return;

    previouslyFocusedRef.current = document.activeElement;
    const returnFocusEl = returnFocusRef?.current ?? null;

    const focusInitial = () => {
      const root = dialogRef.current;
      if (!root) return;
      const initial = root.querySelector<HTMLElement>(
        "[data-menu-initial-focus]",
      );
      if (initial) {
        initial.focus();
        return;
      }
      const list = getFocusable();
      list[0]?.focus();
    };

    const focusId = window.setTimeout(focusInitial, 60);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        requestClose();
        return;
      }
      if (e.key !== "Tab") return;
      const list = getFocusable();
      if (list.length === 0) return;
      const first = list[0]!;
      const last = list[list.length - 1]!;
      const active = document.activeElement as HTMLElement | null;
      if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);

    return () => {
      window.clearTimeout(focusId);
      document.removeEventListener("keydown", onKeyDown, true);

      if (returnFocusEl && document.body.contains(returnFocusEl)) {
        returnFocusEl.focus();
        return;
      }
      const prev = previouslyFocusedRef.current;
      if (prev instanceof HTMLElement && document.body.contains(prev)) {
        prev.focus();
      }
    };
  }, [open, getFocusable, returnFocusRef, requestClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={dialogRef}
          key="premium-menu"
          id="premium-menu-dialog"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="premium-menu-root fixed inset-0 z-[600] max-h-[100dvh] overflow-x-clip overflow-y-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.48, ease: portoEase }}
        >
          <motion.button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            className="absolute inset-0 z-0 bg-[#020308]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.42, ease: portoEase }}
            onClick={() => {
              requestClose();
            }}
          />

          <motion.div
            className="premium-menu-panel absolute inset-0 z-10 flex h-[100dvh] max-h-[100dvh] min-h-0 flex-col overflow-x-clip overflow-y-hidden border border-white/[0.07] bg-[#06080f] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_40px_120px_rgba(0,0,0,0.92)] backdrop-blur-xl backdrop-saturate-150"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.99 }}
            transition={{ duration: 0.62, ease: portoEase }}
          >
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse 50% 45% at 22% 30%, rgba(255,255,255,0.06), transparent 58%),
                  radial-gradient(ellipse 48% 42% at 78% 35%, rgba(255,255,255,0.04), transparent 55%)
                `,
              }}
              aria-hidden
            />
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                backgroundSize: "64px 64px",
              }}
              aria-hidden
            />

            <header className="relative z-10 grid shrink-0 grid-cols-[1fr_auto_1fr] items-center border-b border-white/[0.08] ps-[max(1rem,env(safe-area-inset-left,0px))] pe-[max(1rem,env(safe-area-inset-right,0px))] pb-3 pt-[max(0.75rem,env(safe-area-inset-top,0px))] md:px-8 md:pb-4 md:pt-5">
              <CompanyLogo
                variant="original"
                size={36}
                glow
                className="h-8 w-8 justify-self-start md:h-9 md:w-9"
              />
              <button
                type="button"
                data-menu-initial-focus
                aria-label="Close menu"
                onClick={requestClose}
                className="flex h-10 w-10 shrink-0 items-center justify-center justify-self-center rounded-full border border-white/20 bg-white text-[#0a0a0a] shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-[transform,background-color,box-shadow] duration-300 ease-porto hover:bg-white hover:shadow-[0_12px_48px_rgba(0,0,0,0.45)] active:scale-[0.96] md:h-11 md:w-11"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                  className="md:h-[17px] md:w-[17px]"
                >
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <div className="justify-self-end">
                <MagneticButton
                  href="/contact"
                  size="sm"
                  onClick={onClose}
                  className="min-h-9 px-3 py-1.5 text-[9px] tracking-[0.18em] md:min-h-10 md:px-4 md:py-2 md:text-[10px] md:tracking-[0.2em]"
                >
                  Contact
                </MagneticButton>
              </div>
            </header>

            <nav
              className="relative z-10 flex min-h-0 flex-1 flex-col overflow-x-clip overflow-y-auto overscroll-contain ps-[max(1rem,env(safe-area-inset-left,0px))] pe-[max(1rem,env(safe-area-inset-right,0px))]"
              aria-label="Primary"
            >
              <div className="flex min-h-full w-full flex-1 flex-col">
                <div className="my-auto flex w-full flex-col items-center px-3 pb-[max(1rem,env(safe-area-inset-bottom,0px))] pt-[max(0.5rem,env(safe-area-inset-top,0px))] sm:px-4 sm:pb-6 sm:pt-2 md:px-8">
                  <motion.p
                    className="mb-3 font-sans text-[9px] uppercase tracking-[0.38em] text-neutral-500 sm:mb-4 sm:text-[10px] sm:tracking-[0.42em]"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18, duration: 0.6, ease: portoEase }}
                  >
                    Navigation
                  </motion.p>
                  <ul className="flex w-full max-w-3xl flex-col gap-0 py-1">
                    {NAV_ITEMS.map((item, i) => (
                      <MenuNavLink
                        key={item.label}
                        label={item.label}
                        index={i}
                        muted={"muted" in item && item.muted}
                        href={item.href.startsWith("/#") ? undefined : item.href}
                        onClick={
                          item.href.startsWith("/#")
                            ? () => onNavigate(item.href)
                            : onClose
                        }
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </nav>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
