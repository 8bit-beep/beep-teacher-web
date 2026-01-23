import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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
    domain: ".8beep.site"
  });

  cookieStore.set("refreshToken", newRefresh, {
    path: "/",
    domain: ".8beep.site"
  });

  return NextResponse.json({ accessToken });
}
