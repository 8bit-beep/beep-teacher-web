import { NextResponse } from "next/server";
import {
  ACCESS_TOKEN_MAX_AGE,
  REFRESH_TOKEN_MAX_AGE,
} from "@/shared/constants/auth";

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
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });

  response.cookies.set("refreshToken", refreshToken, {
    path: "/",
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });

  return response;
}
