"use client";

import {
  hasLoaderCompleteDispatched,
  LOADER_COMPLETE_EVENT,
} from "@/lib/porto-events";
import { useLayoutEffect, useState } from "react";

/**
 * True only after `porto:loader-complete` fires (SiteLoader finished or reduced-motion skip).
 * Also checks `hasLoaderCompleteDispatched()` on subscribe so content is not stuck invisible if
 * the event was dispatched before this hook mounted (race with intro / chunk hydration).
 */
export function useLoaderComplete() {
  const [complete, setComplete] = useState(
    () => typeof window !== "undefined" && hasLoaderCompleteDispatched(),
  );

  useLayoutEffect(() => {
    if (hasLoaderCompleteDispatched()) {
      setComplete(true);
    }
    const onComplete = () => setComplete(true);
    window.addEventListener(LOADER_COMPLETE_EVENT, onComplete);
    return () => window.removeEventListener(LOADER_COMPLETE_EVENT, onComplete);
  }, []);

  return complete;
}
