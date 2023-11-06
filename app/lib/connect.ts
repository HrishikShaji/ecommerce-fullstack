import { PrismaClient } from "@prisma/client";

export const baseUrl = process.env.NEXT_PUBLIC_API_URL;

declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
