import { NextResponse } from "next/server";

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;
  if (pathname.match(/^\/pizzarias\/[^/]+\/admin(\/|$)/)) {
    const sessionCookie =
      req.cookies.get("__Secure-next-auth.session-token")?.value ||
      req.cookies.get("next-auth.session-token")?.value;
    if (!sessionCookie) {
      const url = new URL("/api/auth/signin", req.url);
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ["/pizzarias/:slug/admin/:path*"] };
