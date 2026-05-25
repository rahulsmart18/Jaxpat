"use client";

import {
  isFirefox,
  isIOSOrIPadOS,
  isWebKitSafari,
} from "@/lib/browser";
import { useLayoutEffect } from "react";

/**
 * Sets `data-ua-*` on `<html>` for CSS fallbacks (glass blur, compositing) without
 * SSR/client markup mismatches in individual components.
 */
export function BrowserHtmlFlags() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const set = (name: string, on: boolean) => {
      if (on) root.setAttribute(name, "true");
      else root.removeAttribute(name);
    };

    set("data-ua-firefox", isFirefox());
    set("data-ua-safari", isWebKitSafari());
    set("data-ua-ios", isIOSOrIPadOS());

    return () => {
      root.removeAttribute("data-ua-firefox");
      root.removeAttribute("data-ua-safari");
      root.removeAttribute("data-ua-ios");
    };
  }, []);

  return null;
}
