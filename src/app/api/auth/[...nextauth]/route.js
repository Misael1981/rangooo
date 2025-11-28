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
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) token.sub = user.id;
      return token;
    },
    async session({ session, token }) {
      let userId = token?.sub ?? null;
      let u = null;

      if (userId) {
        u = await db.user.findUnique({
          where: { id: userId },
          select: { id: true, email: true, name: true, phone: true, address: true, role: true },
        });
      }

      if (!u && session?.user?.email) {
        u = await db.user.findUnique({
          where: { email: session.user.email },
          select: { id: true, email: true, name: true, phone: true, address: true, role: true },
        });
      }

      if (u) {
        session.user.id = u.id;
        session.user.email = u.email;
        session.user.name = u.name ?? session.user.name;
        session.user.phone = u.phone ?? null;
        session.user.address = u.address ?? null;
        session.user.role = u.role;
      }

      return session;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
