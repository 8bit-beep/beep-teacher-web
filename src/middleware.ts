import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = [
  "/login",
  "/callback/dauth",
] as const;

const STATIC_RESOURCE_PATTERNS = [
  /\.(.*)$/, 
] as const;

const ACCESS_TOKEN_MAX_AGE = 60 * 60 * 12;
const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24;

// JWT payload의 exp를 확인한다 (만료 30초 전부터 만료로 취급)
const isExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(
      atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")),
    );
    if (typeof payload.exp !== "number") return false;
    return payload.exp * 1000 < Date.now() + 30_000;
  } catch {
    return false;
  }
};

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  if (STATIC_RESOURCE_PATTERNS.some((pattern) => pattern.test(pathname))) {
    return NextResponse.next();
  }

  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const webUrl = process.env.NEXT_PUBLIC_WEB_URL;

  if (!webUrl) {
    console.error("NEXT_PUBLIC_WEB_URL 환경 변수가 설정되지 않았습니다.");
    return NextResponse.json({ error: "서버 설정 오류" }, { status: 500 });
  }

  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(`${webUrl}/login`);
  }

  // 액세스 토큰이 없거나 만료됐으면 여기서 갱신한다.
  // refreshToken이 1회용(회전)이라 SSR 중에는 갱신할 수 없고,
  // 브라우저 쿠키까지 갱신 가능한 지점은 미들웨어뿐이다.
  if (refreshToken && (!accessToken || isExpired(accessToken))) {
    try {
      const refreshRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        },
      );

      if (!refreshRes.ok) {
        throw new Error(`refresh failed: ${refreshRes.status}`);
      }

      const { accessToken: newAccess, refreshToken: newRefresh } =
        await refreshRes.json();

      // 이번 요청의 SSR이 새 토큰을 읽도록 요청 쿠키를 교체
      req.cookies.set("accessToken", newAccess);
      req.cookies.set("refreshToken", newRefresh);

      const res = NextResponse.next({ request: { headers: req.headers } });

      // 브라우저 쿠키도 갱신
      res.cookies.set("accessToken", newAccess, {
        path: "/",
        maxAge: ACCESS_TOKEN_MAX_AGE,
      });
      res.cookies.set("refreshToken", newRefresh, {
        path: "/",
        maxAge: REFRESH_TOKEN_MAX_AGE,
      });

      return res;
    } catch (e) {
      console.error(`[middleware] 토큰 갱신 실패 → /login 이동`, e);

      const res = NextResponse.redirect(`${webUrl}/login`);
      res.cookies.delete("accessToken");
      res.cookies.delete("refreshToken");
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|otf)).*)",
  ],
};