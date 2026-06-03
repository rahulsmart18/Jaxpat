"use client";

import dynamic from "next/dynamic";

/**
 * Client-only mount wrapper for `Logo3DBackdrop`.
 *
 * R3F's `Canvas` + `useLoader(TextureLoader, ...)` cannot run on the server,
 * so we dynamic-import the heavy bundle with `ssr: false`. Server Components
 * (e.g. `app/page.tsx`) cannot use `dynamic({ ssr: false })` directly, so they
 * render this thin client wrapper instead.
 */
const Logo3DBackdrop = dynamic(
  () => import("./Logo3DBackdrop").then((m) => m.Logo3DBackdrop),
  { ssr: false },
);

export function Logo3DBackdropMount() {
  return <Logo3DBackdrop />;
}

export default Logo3DBackdropMount;
