/**
 * Runtime guards for engines where Lenis, backdrop blur, or custom cursor
 * compositing is unreliable or expensive — see SmoothScroll, FramerCursor,
 * PremiumMenu, AmbientOrbs, globals.css `data-ua-*` rules.
 */
export function isIOSOrIPadOS(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const iPadDesktopMode =
    navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
  return /iPhone|iPad|iPod/i.test(ua) || iPadDesktopMode;
}

/** Apple WebKit Safari (excludes Chrome, Edge, Firefox, Opera, Brave, etc.). */
export function isWebKitSafari(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return (
    /Safari/i.test(ua) &&
    !/Chrome|Chromium|CriOS|Edg|OPR|FxiOS|Brave|Avast|Vivaldi/i.test(ua)
  );
}

/** Gecko — backdrop-filter + scroll-linked effects are disproportionately expensive. */
export function isFirefox(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Firefox\/\d/i.test(navigator.userAgent);
}

/**
 * Native scrolling instead of Lenis — fewer glitches on WebKit and less main-thread
 * work on Firefox while ScrollTrigger + Framer run.
 */
export function shouldDisableLenisSmoothScroll(): boolean {
  return isIOSOrIPadOS() || isWebKitSafari() || isFirefox();
}
