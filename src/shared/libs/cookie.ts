import { IncomingMessage, ServerResponse } from "http";
import Cookies from "js-cookie";

const isServer = typeof window === "undefined";

export const getCookie = (name: string, req?: IncomingMessage): string | undefined => {
  if (isServer && req) {
    const cookie = req.headers?.cookie || "";
    const match = cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : undefined;
  } else {
    return Cookies.get(name);
  }
}

export const setCookie = (
  name: string,
  value: string,
  options?: Cookies.CookieAttributes,
  res?: ServerResponse,
) => {
  if (isServer && res) {
    res.setHeader(
      "Set-Cookie",
      `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly`,
    );
  } else {
    Cookies.set(name, value, options);
  }
}