import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");

  const webUrl = process.env.NEXT_PUBLIC_WEB_URL || "";

  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(`${webUrl}/login`);
  }

  const response = NextResponse.redirect(`${webUrl}/`);

  response.cookies.set("accessToken", accessToken, {
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  response.cookies.set("refreshToken", refreshToken, {
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
