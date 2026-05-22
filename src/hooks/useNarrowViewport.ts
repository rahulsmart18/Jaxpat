"use client";

import { useEffect, useState } from "react";

const QUERY = "(max-width: 767px)";

/**
 * True when viewport is narrow (Tailwind `md` breakpoint and below).
 * Defaults to `false` until mounted to avoid SSR/client mismatch; updates on resize.
 */
export function useNarrowViewport(): boolean {
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return narrow;
}
