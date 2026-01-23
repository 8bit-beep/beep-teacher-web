import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");

  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const cookieStore = await cookies();

  cookieStore.set("accessToken", accessToken, {
    path: "/",
    domain: ".8beep.site"
  });

  cookieStore.set("refreshToken", refreshToken, {
    path: "/",
    domain: ".8beep.site"
  });

  return NextResponse.redirect(new URL("/", request.url));
}