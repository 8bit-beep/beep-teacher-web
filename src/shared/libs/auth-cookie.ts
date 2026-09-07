import {
  ACCESS_TOKEN_MAX_AGE,
  REFRESH_TOKEN_MAX_AGE,
} from "@/shared/constants/auth";

export const authCookieOptions = {
  path: "/",
  maxAge: ACCESS_TOKEN_MAX_AGE,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};

export const refreshCookieOptions = {
  path: "/",
  maxAge: REFRESH_TOKEN_MAX_AGE,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};
