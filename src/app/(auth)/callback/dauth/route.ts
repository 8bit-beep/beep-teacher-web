import { NextResponse } from "next/server";
import { authCookieOptions, refreshCookieOptions } from "@/shared/libs/auth-cookie";

const CORRELATION_ID_PATTERN = /^[a-zA-Z0-9._-]{1,128}$/;
const OAUTH_ERROR_PATTERN = /^[a-zA-Z0-9._-]{1,64}$/;

const getCorrelationId = (request: Request): string => {
  const incomingId =
    request.headers.get("x-correlation-id") ??
    request.headers.get("x-request-id");

  return incomingId && CORRELATION_ID_PATTERN.test(incomingId)
    ? incomingId
    : crypto.randomUUID();
};

const getProviderFailureReason = (error: string): string => {
  const normalizedError = OAUTH_ERROR_PATTERN.test(error)
    ? error
    : "unknown_error";

  return `provider_${normalizedError}`;
};

const redirectToLoginWithFailure = (
  webUrl: string,
  reason: string,
  correlationId: string,
) => {
  console.error("[dauth-callback] authentication failed", {
    reason,
    correlationId,
  });

  const loginUrl = new URL("/login", webUrl);
  loginUrl.searchParams.set("error", "oauth");
  loginUrl.searchParams.set("reason", reason);
  loginUrl.searchParams.set("correlationId", correlationId);

  const response = NextResponse.redirect(loginUrl);
  response.headers.set("X-Correlation-ID", correlationId);
  response.headers.set("Referrer-Policy", "no-referrer");

  return response;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");
  const providerError = searchParams.get("error");

  const webUrl = process.env.NEXT_PUBLIC_WEB_URL || "";
  const correlationId = getCorrelationId(request);

  if (providerError) {
    return redirectToLoginWithFailure(
      webUrl,
      getProviderFailureReason(providerError),
      correlationId,
    );
  }

  if (!accessToken) {
    return redirectToLoginWithFailure(
      webUrl,
      "missing_access_token",
      correlationId,
    );
  }

  if (!refreshToken) {
    return redirectToLoginWithFailure(
      webUrl,
      "missing_refresh_token",
      correlationId,
    );
  }

  const response = NextResponse.redirect(`${webUrl}/`);

  response.cookies.set("accessToken", accessToken, authCookieOptions);
  response.cookies.set("refreshToken", refreshToken, refreshCookieOptions);
  response.headers.set("X-Correlation-ID", correlationId);
  response.headers.set("Referrer-Policy", "no-referrer");

  return response;
}
