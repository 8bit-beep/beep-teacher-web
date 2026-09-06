import { NextResponse } from "next/server";
import { authCookieOptions, refreshCookieOptions } from "@/shared/libs/auth-cookie";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");

  const webUrl = process.env.NEXT_PUBLIC_WEB_URL || "";

  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(`${webUrl}/login`);
  }

  const response = NextResponse.redirect(`${webUrl}/`);

  response.cookies.set("accessToken", accessToken, authCookieOptions);
  response.cookies.set("refreshToken", refreshToken, refreshCookieOptions);
  response.headers.set("Referrer-Policy", "no-referrer");

  return response;
}
