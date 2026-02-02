import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");

  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_WEB_URL || ""}/login`);
  }

  const cookieStore = await cookies();

  cookieStore.set("accessToken", accessToken, {
    path: "/",
    domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || "teacher.8beep.site",
    maxAge: 60 * 60 * 12,
  });

  cookieStore.set("refreshToken", refreshToken, {
    path: "/",
    domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || "teacher.8beep.site",
    maxAge: 60 * 60 * 24,
  });

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_WEB_URL || ""}/`);
}
