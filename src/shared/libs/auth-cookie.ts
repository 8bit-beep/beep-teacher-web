export const authCookieOptions = {
  path: "/",
  maxAge: 60 * 60 * 12,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};

export const refreshCookieOptions = {
  path: "/",
  maxAge: 60 * 60 * 24,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};
