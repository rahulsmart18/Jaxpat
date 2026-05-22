"use client";

import { FramerCursor } from "@/components/FramerCursor";
import { GsapScrollSetup } from "@/components/GsapScrollSetup";
import { PageEntrance } from "@/components/PageEntrance";
import { PageTransition } from "@/components/PageTransition";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SiteLoader } from "@/components/SiteLoader";
import { SmoothScroll } from "@/components/SmoothScroll";

export function SiteProviders({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <SiteLoader />
      <GsapScrollSetup />
      <ScrollProgress />
      <FramerCursor />
      <PageTransition>
        <PageEntrance>{children}</PageEntrance>
      </PageTransition>
    </SmoothScroll>
  );
}
