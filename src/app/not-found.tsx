import Link from "next/link";

/** Keep this route server-only so dev doesn’t orphan `_not-found` chunks (e.g. missing `./447.js`). */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-white">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
        404
      </p>
      <h1 className="mt-4 font-display text-3xl font-semibold uppercase tracking-tight md:text-4xl">
        Page not found
      </h1>
      <Link
        href="/"
        className="mt-8 text-xs font-semibold uppercase tracking-[0.28em] text-white underline-offset-4 transition hover:underline"
      >
        Back home
      </Link>
    </div>
  );
}
