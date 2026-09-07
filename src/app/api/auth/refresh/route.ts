import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { authCookieOptions, refreshCookieOptions } from "@/shared/libs/auth-cookie";
import {
  refreshAuthTokens,
  TokenRefreshRequestError,
} from "@/shared/libs/refresh-token";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json({ message: "No refresh token" }, { status: 401 });
  }

  let accessToken: string;
  let newRefresh: string;

  try {
    const tokens = await refreshAuthTokens(refreshToken);
    accessToken = tokens.accessToken;
    newRefresh = tokens.refreshToken;
  } catch (error) {
    const status =
      error instanceof TokenRefreshRequestError ? error.status : 502;
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Refresh request failed" },
      { status },
    );
  }

  cookieStore.set("accessToken", accessToken, authCookieOptions);
  cookieStore.set("refreshToken", newRefresh, refreshCookieOptions);

  return NextResponse.json({ accessToken });
}
