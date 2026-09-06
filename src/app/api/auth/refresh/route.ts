import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const REFRESH_TIMEOUT_MS = 10_000;

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json({ message: "No refresh token" }, { status: 401 });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REFRESH_TIMEOUT_MS);

  let res: Response;

  try {
    res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      signal: controller.signal,
    });
  } catch (error) {
    const isTimeout = error instanceof DOMException && error.name === "AbortError";
    return NextResponse.json(
      { message: isTimeout ? "Refresh request timed out" : "Refresh request failed" },
      { status: isTimeout ? 504 : 502 },
    );
  } finally {
    clearTimeout(timeoutId);
  }

  if (!res.ok) {
    return NextResponse.json({ message: "Refresh failed" }, { status: 401 });
  }

  const payload: unknown = await res.json().catch(() => null);

  if (
    !payload ||
    typeof payload !== "object" ||
    typeof (payload as { accessToken?: unknown }).accessToken !== "string" ||
    typeof (payload as { refreshToken?: unknown }).refreshToken !== "string"
  ) {
    return NextResponse.json({ message: "Invalid refresh response" }, { status: 502 });
  }

  const { accessToken, refreshToken: newRefresh } = payload as {
    accessToken: string;
    refreshToken: string;
  };

  cookieStore.set("accessToken", accessToken, {
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  cookieStore.set("refreshToken", newRefresh, {
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return NextResponse.json({ accessToken });
}
