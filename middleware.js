import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;
  if (pathname.match(/^\/pizzarias\/[^/]+\/admin(\/|$)/)) {
    const token = await getToken({ req });
    if (!token) {
      const url = new URL("/api/auth/signin", req.url);
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ["/pizzarias/:slug/admin/:path*"] };
