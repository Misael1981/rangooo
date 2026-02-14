import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      isProfileCompleted?: boolean; // A mágica acontece aqui!
    } & DefaultSession["user"];
  }
  interface User {
    id: string;
    isProfileCompleted?: boolean;
  }
}
