import { Adapter } from "next-auth/adapters";
import { db } from "./prisma";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions, getServerSession } from "next-auth";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
      authorization: { params: { scope: "email,public_profile" } },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;

        const dbUser = user as { isProfileCompleted?: boolean };
        session.user.isProfileCompleted = dbUser.isProfileCompleted ?? false;
      }

      return session;
    },
  },

  secret: process.env.NEXT_AUTH_SECRET,
};

export async function getSession() {
  return await getServerSession(authOptions);
}
