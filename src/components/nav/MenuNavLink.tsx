"use client";

import { portoEase } from "@/lib/motion";
import { motion } from "framer-motion";
import Link from "next/link";

type MenuNavLinkProps = {
  label: string;
  href?: string;
  onClick?: () => void;
  index: number;
  muted?: boolean;
};

export function MenuNavLink({
  label,
  href,
  onClick,
  index,
  muted = false,
}: MenuNavLinkProps) {
  const className = `group relative flex min-h-[44px] w-full touch-manipulation items-center justify-center py-1.5 text-center font-display text-[clamp(1.1rem,min(4vw,6dvh),2.85rem)] font-semibold uppercase leading-[1.05] tracking-[-0.04em] transition-colors duration-500 min-[380px]:text-[clamp(1.2rem,min(4.5vw,6.5dvh),3rem)] sm:min-h-0 sm:py-2 sm:text-[clamp(1.3rem,min(5vw,7dvh),3.35rem)] md:text-[clamp(1.45rem,min(5.5vw,7dvh),3.85rem)] lg:text-[clamp(1.55rem,5.25vw,4.25rem)] ${
    muted ? "text-neutral-500" : "text-white"
  }`;

  const inner = (
    <>
      <span className="relative z-10 inline-block transition-transform duration-500 ease-porto md:group-hover:-translate-y-0.5">
        {label}
      </span>
      <span
        className="absolute bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/80 to-transparent transition-all duration-500 ease-porto md:group-hover:w-[min(100%,12rem)]"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute inset-x-[15%] bottom-0 h-px bg-transparent transition-all duration-500 md:group-hover:bg-white/20"
        aria-hidden
      />
    </>
  );

  return (
    <motion.li
      initial={{ opacity: 0, y: 48, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        delay: 0.22 + index * 0.07,
        duration: 0.75,
        ease: portoEase,
      }}
    >
      {href ? (
        <Link href={href} onClick={onClick} className={className} data-cursor-hover>
          {inner}
        </Link>
      ) : (
        <button type="button" onClick={onClick} className={className}>
          {inner}
        </button>
      )}
    </motion.li>
  );
}
