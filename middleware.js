import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const ACCESS_DENIED_URL = "/auth/error?code=403";
const SIGN_IN_URL = "/api/auth/signin";

export async function middleware(req) {
  const { pathname, searchParams } = req.nextUrl;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    const signInUrl = new URL(SIGN_IN_URL, req.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  console.log("Token no Middleware:", token);
  console.log("Role no Middleware:", token.role);
  console.log("Slugs no Middleware:", token.accessibleSlugs);

  // --- Lógica de Autorização ---

  if (pathname.startsWith("/admin/rangooo")) {
    const requiredRole = "ADMIN";
    if (token.role !== requiredRole) {
      console.log(`Acesso negado: ${token.role} tentou acessar Rangooo Admin.`);
      return NextResponse.redirect(new URL(ACCESS_DENIED_URL, req.url));
    }
  }

  const slugMatch = pathname.match(/^\/admin\/([^/]+)/);

  if (slugMatch) {
    const slugAcessado = slugMatch[1];

    if (token.role === "ADMIN") {
      return NextResponse.next();
    }

    if (token.role === "RESTAURANT_OWNER" || token.role === "DELIVERY_PERSON") {
      const isAccessible = token.accessibleSlugs?.includes(slugAcessado);

      if (!isAccessible) {
        console.log(
          `Acesso negado: ${token.role} tentou acessar slug não autorizado: ${slugAcessado}`,
        );
        return NextResponse.redirect(new URL(ACCESS_DENIED_URL, req.url));
      }
    }

    if (token.role === "CLIENT") {
      return NextResponse.redirect(new URL(ACCESS_DENIED_URL, req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
