import { NextResponse, type NextRequest } from "next/server";
import { AUTH_COOKIE, verifyToken } from "@/lib/auth";

// Optimistic gate: /admin pages, upload signing and every non-GET request to
// the destinations/journeys APIs need a valid admin cookie. Route handlers
// re-check via requireAdmin().
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isApi = pathname.startsWith("/api/");

  if (pathname === "/admin/login") return NextResponse.next();

  const isPublicRead =
    isApi &&
    !pathname.startsWith("/api/upload") &&
    (request.method === "GET" || request.method === "HEAD");
  if (isPublicRead) return NextResponse.next();

  if (await verifyToken(request.cookies.get(AUTH_COOKIE)?.value)) {
    return NextResponse.next();
  }

  if (isApi) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const login = new URL("/admin/login", request.url);
  login.searchParams.set("next", pathname);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/upload/:path*",
    "/api/destinations/:path*",
    "/api/journeys/:path*",
    "/api/destinations",
    "/api/journeys",
    // DELETE only; POST /api/requests (the public form) is intentionally unmatched.
    "/api/requests/:id",
  ],
};
