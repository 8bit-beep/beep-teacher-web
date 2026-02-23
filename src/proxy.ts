import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = [
  "/login",
  "/callback/dauth",
] as const;

const STATIC_RESOURCE_PATTERNS = [
  /\.(.*)$/, 
] as const;

export default function proxy(req: NextRequest) {
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

  if (!accessToken && !refreshToken) {
    const webUrl = process.env.NEXT_PUBLIC_WEB_URL;
    
    if (!webUrl) {
      console.error("NEXT_PUBLIC_WEB_URL 환경 변수가 설정되지 않았습니다.");
      return NextResponse.json(
        { error: "서버 설정 오류" },
        { status: 500 }
      );
    }
    
    return NextResponse.redirect(`${webUrl}/login`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|otf)).*)",
  ],
};