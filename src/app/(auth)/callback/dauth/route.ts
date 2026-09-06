import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { authCookieOptions, refreshCookieOptions } from "@/shared/libs/auth-cookie";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");

  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_WEB_URL || ""}/login`);
  }

  const cookieStore = await cookies();

  cookieStore.set("accessToken", accessToken, authCookieOptions);

  cookieStore.set("refreshToken", refreshToken, refreshCookieOptions);

  const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_WEB_URL || ""}/`);
  response.headers.set("Referrer-Policy", "no-referrer");

  return response;
}
