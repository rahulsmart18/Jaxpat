"use client";

import { BRAND_LOGOS, type BrandLogoKey } from "@/lib/brand-logos";
import { COMPANY_NAME } from "@/lib/site-brand";
import Image from "next/image";
import Link from "next/link";

type CompanyLogoProps = {
  variant?: BrandLogoKey;
  size?: number;
  className?: string;
  href?: string | null;
  priority?: boolean;
  animated?: boolean;
  glow?: boolean;
};

export function CompanyLogo({
  variant = "original",
  size = 40,
  className = "",
  href = "/",
  priority = false,
  animated = false,
  glow = false,
}: CompanyLogoProps) {
  const src = BRAND_LOGOS[variant];
  const img = (
    <Image
      src={src}
      alt={`${COMPANY_NAME} logo`}
      width={size}
      height={size}
      priority={priority}
      className={`relative z-[1] object-contain ${animated ? "logo-pulse" : ""} ${className}`}
    />
  );

  const content = glow ? (
    <span className="nav-logo-glow group relative inline-flex shrink-0">
      <span className="nav-logo-glow-halo nav-logo-glow-halo--light" aria-hidden />
      {img}
    </span>
  ) : (
    img
  );

  if (href == null) {
    return <span className="inline-flex shrink-0">{content}</span>;
  }

  return (
    <Link
      href={href}
      data-cursor-hover
      className="inline-flex shrink-0 touch-manipulation rounded-md transition-opacity hover:opacity-90 active:opacity-80"
      aria-label={`${COMPANY_NAME} home`}
    >
      {content}
    </Link>
  );
}
