import { AUTH_REQUEST_TIMEOUT_MS } from "@/shared/constants/auth";

interface RefreshTokens {
  accessToken: string;
  refreshToken: string;
}

export class TokenRefreshRequestError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "TokenRefreshRequestError";
  }
}

export const refreshAuthTokens = async (
  refreshToken: string,
): Promise<RefreshTokens> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    AUTH_REQUEST_TIMEOUT_MS,
  );

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      throw new TokenRefreshRequestError(
        "Token refresh failed",
        response.status === 401 ? 401 : 502,
      );
    }

    const payload: unknown = await response.json().catch(() => null);

    if (
      !payload ||
      typeof payload !== "object" ||
      typeof (payload as { accessToken?: unknown }).accessToken !== "string" ||
      typeof (payload as { refreshToken?: unknown }).refreshToken !== "string"
    ) {
      throw new TokenRefreshRequestError("Invalid refresh response", 502);
    }

    return payload as RefreshTokens;
  } catch (error) {
    if (error instanceof TokenRefreshRequestError) {
      throw error;
    }

    const isTimeout = error instanceof Error && error.name === "AbortError";
    throw new TokenRefreshRequestError(
      isTimeout ? "Refresh request timed out" : "Refresh request failed",
      isTimeout ? 504 : 502,
    );
  } finally {
    clearTimeout(timeoutId);
  }
};
