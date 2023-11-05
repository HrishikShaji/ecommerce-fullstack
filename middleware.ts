import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const { pathname, searchParams } = request.nextUrl;
  const token = await getToken({
    req: request,
    secret: process.env.SECRET,
  });
  if (!token && pathname === "/") {
    const url = new URL("/login", request.url);
    return NextResponse.redirect(url);
  }
  if (!token && pathname === "/dashboard") {
    const url = new URL("/login", request.url);
    return NextResponse.redirect(url);
  }
  if (token?.role !== "ADMIN" && pathname === "/dashboard") {
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  }

  if (token && pathname === "/login") {
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  }
  return res;
}
