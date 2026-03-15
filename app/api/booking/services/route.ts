import { NextResponse } from "next/server";

const PORTAL_API_URL =
  process.env.PORTAL_INTERNAL_URL ?? process.env.NEXT_PUBLIC_PORTAL_URL ?? "http://localhost:3001/portal";

/**
 * GET /api/booking/services
 * Proxy to portal's public service-types API.
 * Returns active, public services with instructors.
 */
export async function GET() {
  try {
    const res = await fetch(`${PORTAL_API_URL}/api/public/service-types`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Kunne ikke hente tjenester" },
        { status: 503 }
      );
    }

    const data = await res.json();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("[booking/services] Failed to fetch from portal:", error);
    return NextResponse.json(
      { error: "Tjenester er midlertidig utilgjengelige" },
      { status: 503 }
    );
  }
}
