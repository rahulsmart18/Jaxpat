import { NextResponse } from "next/server";

/** Chrome DevTools probes this URL; avoids 404 noise without touching `/_next` in middleware. */
export function GET() {
  return NextResponse.json(
    {},
    { headers: { "Cache-Control": "public, max-age=86400" } },
  );
}
