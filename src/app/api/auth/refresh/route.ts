import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_WEB_URL!));
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_WEB_URL!));
  }

  const { accessToken, refreshToken: newRefresh } = await res.json();

  cookieStore.set("accessToken", accessToken, {
    path: "/",
  });

  cookieStore.set("refreshToken", newRefresh, {
    path: "/",
  });

  return NextResponse.json({ accessToken });
}
