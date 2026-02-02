import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getAccessToken, deleteAuthCookies } from "./cookie";
import { Error } from "../types/error";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = await getAccessToken();

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let isRefreshing = false;
let queue: Array<(token?: string) => void> = [];

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error: AxiosError<Error>) => {
    const original = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 403 ||
      error.response?.status === 404 ||
      error.response?.status === 400
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status !== 401 || original._retry) {
      await deleteAuthCookies();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      } else {
        const redirect = await import("next/navigation").then(
          (mod) => mod.redirect,
        );
        redirect("/login");
      }
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve) => {
        queue.push((token) => {
          if (token) {
            original.headers.Authorization = `Bearer ${token}`;
          }
          resolve(api(original));
        });
      });
    }

    original._retry = true;
    isRefreshing = true;

    try {
      const refreshRes = await fetch(
        `${process.env.NEXT_PUBLIC_WEB_URL}/api/auth/refresh`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (!refreshRes.ok) {
        await deleteAuthCookies();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        } else {
          const redirect = await import("next/navigation").then(
            (mod) => mod.redirect,
          );
          const cookies = await import("next/headers").then(
            (mod) => mod.cookies,
          );
          const cookieStore = await cookies();
          cookieStore.delete("accessToken");
          cookieStore.delete("refreshToken");
          redirect("/login");
        }
      }

      const { accessToken } = await refreshRes.json();

      queue.forEach((cb) => cb(accessToken));
      queue = [];

      original.headers.Authorization = `Bearer ${accessToken}`;
      return api(original);
    } catch (e) {
      queue = [];
      await deleteAuthCookies();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      } else {
        const redirect = await import("next/navigation").then(
          (mod) => mod.redirect,
        );
        redirect("/login");
      }
      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
