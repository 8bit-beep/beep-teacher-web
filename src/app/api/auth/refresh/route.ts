import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ACCESS_TOKEN_MAX_AGE,
  REFRESH_TOKEN_MAX_AGE,
} from "@/shared/constants/auth";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json({ message: "No refresh token" }, { status: 401 });
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    return NextResponse.json({ message: "Refresh failed" }, { status: 401 });
  }

  const { accessToken, refreshToken: newRefresh } = await res.json();

  cookieStore.set("accessToken", accessToken, {
    path: "/",
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });

  cookieStore.set("refreshToken", newRefresh, {
    path: "/",
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });

  return NextResponse.json({ accessToken });
}
