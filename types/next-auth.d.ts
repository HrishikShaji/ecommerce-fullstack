import { Role, User } from "@prisma/client";
import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

type UserId = string;

declare module "next-auth" {
  interface Session {
    user: User & {
      role: Role;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    image: string;
    role: Role;
  }
}
