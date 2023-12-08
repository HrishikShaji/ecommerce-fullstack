import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./connect";
import { NextAuthOptions, User, getServerSession } from "next-auth";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }: { user?: User | undefined; token: JWT | any }) {
      if (user && user.id) {
        const loggedInUser = await prisma.user.findUnique({
          where: {
            id: user?.id,
          },
          include: {
            cart: true,
          },
        });
        if (loggedInUser?.cart === null) {
          await prisma.cart.create({
            data: {
              userId: user.id,
            },
          });
        }
      }

      const users = await prisma.user.findMany({});
      if (users.length === 1 && token.email) {
        await prisma.user.update({
          where: {
            email: token.email,
          },
          data: {
            role: "ADMIN",
          },
        });
      }
      if (token.email) {
        const dbUser = await prisma.user.findFirst({
          where: {
            email: token.email,
          },
          include: {
            cart: true,
          },
        });
        if (!dbUser) {
          token.id = user!.id;
          return token;
        }
        return {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          image: dbUser.image,
          role: dbUser.role,
        };
      }
      return token;
    },
  },
};
export const getAuthSession = () => getServerSession(authOptions);
