"use client";

import { FramerCursor } from "@/components/FramerCursor";

export function SiteProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FramerCursor />
      {children}
    </>
  );
}
