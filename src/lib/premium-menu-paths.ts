/**
 * Routes where the full-screen premium menu is off: no center trigger, no overlay.
 * Match exact path or prefix (e.g. `/contact` and `/contact/thanks`).
 */
export const PREMIUM_MENU_DISABLED_PREFIXES = ["/contact"] as const;

export function isPremiumMenuDisabledForPath(pathname: string): boolean {
  return (PREMIUM_MENU_DISABLED_PREFIXES as readonly string[]).some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}
