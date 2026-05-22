"use client";

import { MagneticButton } from "@/components/motion/MagneticButton";

type ShineLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
};

export function ShineLink({
  href,
  children,
  className = "",
  external,
}: ShineLinkProps) {
  return (
    <MagneticButton
      href={href}
      external={external}
      variant="default"
      className={`min-h-[48px] px-8 py-3.5 text-xs font-medium uppercase tracking-[0.25em] ${className}`}
    >
      {children}
    </MagneticButton>
  );
}
