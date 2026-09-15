import { NextResponse, type NextRequest } from "next/server";

/**
 * Georgian is served from unprefixed URLs and English from /en. Every route
 * lives under app/[lang], so unprefixed requests are rewritten onto the
 * internal /ka segment, and a typed-in /ka URL redirects to its clean form.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/")) return;

  if (pathname === "/ka" || pathname.startsWith("/ka/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/ka${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, public files (anything with an extension) and metadata routes.
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
