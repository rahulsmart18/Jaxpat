"use client";

import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import {
  forwardRef,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type MutableRefObject,
  type ReactNode,
  type Ref,
} from "react";

export type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  external?: boolean;
  variant?: "default" | "ghost" | "light" | "minimal";
  size?: "md" | "sm" | "icon";
  /** `rect` = square corners (e.g. services rows); default pill for nav CTAs */
  shape?: "pill" | "rect";
  /** Inner flex justification (`between` pushes edge-aligned row content, e.g. chevron right). */
  justifyInner?: "center" | "between";
  /**
   * Cursor-follow “magnetic” shift (fine pointers only). Use sparingly — e.g. key CTAs on `/contact`.
   */
  magneticPull?: boolean;
  /** Multiplier for pull distance when `magneticPull` (default ~0.32). */
  pullStrength?: number;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">;

const variantClass: Record<
  NonNullable<MagneticButtonProps["variant"]>,
  string
> = {
  default:
    "magnetic-btn magnetic-btn-default border border-white/25 bg-white/[0.06] text-white shadow-porto",
  ghost:
    "magnetic-btn magnetic-btn-ghost border border-white/20 bg-white/[0.03] text-white/90",
  light:
    "magnetic-btn magnetic-btn-light border border-white/20 bg-white text-black shadow-porto",
  minimal:
    "magnetic-btn magnetic-btn-minimal border border-transparent bg-transparent text-inherit shadow-none",
};

const sizeClass: Record<NonNullable<MagneticButtonProps["size"]>, string> = {
  md: "min-h-[48px] px-8 py-3.5 text-xs font-medium uppercase tracking-[0.22em]",
  sm: "min-h-[44px] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em]",
  icon: "h-11 w-11 min-h-0 shrink-0 p-0 text-xl font-light",
};

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (!ref) return;
  if (typeof ref === "function") ref(value);
  else (ref as MutableRefObject<T | null>).current = value;
}

export const MagneticButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement | null,
  MagneticButtonProps
>(function MagneticButton(
  {
    children,
    className = "",
    href,
    external,
    variant = "default",
    size = "md",
    shape = "pill",
    justifyInner = "center",
    magneticPull = false,
    pullStrength = 0.32,
    type = "button",
    disabled,
    onClick,
    ...buttonProps
  },
  ref,
) {
  const rootRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [pull, setPull] = useState({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();

  const setRefs = useCallback(
    (node: HTMLButtonElement | HTMLAnchorElement | null) => {
      rootRef.current = node;
      assignRef(ref, node);
    },
    [ref],
  );

  useLayoutEffect(() => {
    if (!magneticPull || disabled || reduceMotion) return;
    const root = rootRef.current;
    if (!root) return;
    const shell = root.querySelector<HTMLElement>(".magnetic-btn-shell");
    if (!shell) return;

    const coarse =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;
    if (coarse) return;

    const maxPx = 14;
    const s = pullStrength;

    const clamp = (v: number) => Math.max(-1, Math.min(1, v));

    const onMove = (e: MouseEvent) => {
      const r = shell.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const halfW = Math.max(r.width / 2, 1);
      const halfH = Math.max(r.height / 2, 1);
      const nx = clamp((e.clientX - cx) / halfW);
      const ny = clamp((e.clientY - cy) / halfH);
      setPull({ x: nx * maxPx * s, y: ny * maxPx * s });
    };

    const onLeave = () => setPull({ x: 0, y: 0 });

    shell.addEventListener("mousemove", onMove);
    shell.addEventListener("mouseleave", onLeave);
    return () => {
      shell.removeEventListener("mousemove", onMove);
      shell.removeEventListener("mouseleave", onLeave);
    };
  }, [magneticPull, disabled, pullStrength, reduceMotion]);

  useLayoutEffect(() => {
    if (!magneticPull || reduceMotion) setPull({ x: 0, y: 0 });
  }, [magneticPull, reduceMotion]);

  const base = `${variantClass[variant]} ${sizeClass[size]} ${className}`;

  const shellShape = shape === "rect" ? "magnetic-btn-shape-rect" : "";

  const innerLayoutClass =
    justifyInner === "between"
      ? "flex w-full min-w-0 max-w-full items-center justify-between gap-4"
      : "inline-flex w-full max-w-full items-center justify-center gap-2";

  const shellStyle =
    magneticPull && !disabled
      ? ({
          transform: `translate3d(${pull.x}px, ${pull.y}px, 0)`,
        } as const)
      : undefined;

  const shell = (
    <div
      className={`magnetic-btn-shell group ${shellShape} ${base} ${disabled ? "pointer-events-none opacity-40" : ""}`}
      data-cursor-hover={disabled ? undefined : true}
      data-magnetic-pull={magneticPull && !disabled ? "true" : undefined}
      style={shellStyle}
    >
      <span
        className="magnetic-btn-glow pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      />
      <span
        className="magnetic-btn-shine pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      />
      <span
        className={`magnetic-btn-inner relative z-[1] ${innerLayoutClass}`}
      >
        {children}
      </span>
    </div>
  );

  const outerClass = `inline-flex touch-manipulation border-0 bg-transparent p-0${justifyInner === "between" ? " w-full min-w-0" : ""}`;

  const linkClick = onClick as React.MouseEventHandler<HTMLElement> | undefined;

  if (href) {
    if (external) {
      return (
        <a
          ref={setRefs as React.Ref<HTMLAnchorElement>}
          href={href}
          target="_blank"
          rel="noreferrer"
          className={outerClass}
          onClick={linkClick}
        >
          {shell}
        </a>
      );
    }
    return (
      <Link
        ref={setRefs as React.Ref<HTMLAnchorElement>}
        href={href}
        className={outerClass}
        onClick={linkClick}
      >
        {shell}
      </Link>
    );
  }

  return (
    <button
      ref={setRefs as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={outerClass}
      {...buttonProps}
    >
      {shell}
    </button>
  );
});

MagneticButton.displayName = "MagneticButton";
