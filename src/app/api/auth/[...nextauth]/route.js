// src/app/api/auth/[...nextauth]/route.js
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import { db } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      authorization: { params: { scope: "email,public_profile" } },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("-> Realizando busca de Role e Slugs no DB...");

        token.id = user.id;
        token.sub = user.id;

        const dbUser = await db.user.findUnique({
          where: { id: user.id },
          select: {
            role: true,
            restaurants: {
              select: { slug: true },
            },
            restaurantRoles: {
              select: {
                restaurant: { select: { slug: true } },
              },
            },
          },
        });

        token.role = dbUser?.role || "CLIENT";

        const ownedSlugs = dbUser?.restaurants?.map((r) => r.slug) || [];
        const employeeSlugs =
          dbUser?.restaurantRoles?.map((ru) => ru.restaurant.slug) || [];

        token.accessibleSlugs = [...new Set([...ownedSlugs, ...employeeSlugs])];

        console.log(`Role definida no Token: ${token.role}`);
        console.log(`Slugs Acessíveis: ${token.accessibleSlugs.length}`);
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id || token.sub;
        session.user.role = token.role || "CLIENT";
      }
      return session;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
