import { JWT } from "next-auth/jwt";
import NextAuth, { DefaultSession } from "next-auth";

declare type Rol = "agency" | "business" | "user";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    rol: Rol;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      rol: Rol;
    } & DefaultSession["user"];
  }

  interface User {
    rol: Rol;
  }
}