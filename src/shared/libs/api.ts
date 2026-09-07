import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getAccessToken } from "./cookie";
import type { Error } from "../types/error";
import { AUTH_REQUEST_TIMEOUT_MS } from "../constants/auth";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: AUTH_REQUEST_TIMEOUT_MS,
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

const refreshAccessToken = async () => {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(
    () => controller.abort(),
    AUTH_REQUEST_TIMEOUT_MS,
  );

  try {
    const refreshRes = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
      signal: controller.signal,
    });

    if (!refreshRes.ok) {
      throw new Error("Token refresh failed");
    }

    const { accessToken } = await refreshRes.json();

    if (typeof accessToken !== "string" || !accessToken) {
      throw new Error("Token refresh returned an invalid access token");
    }

    return accessToken;
  } finally {
    window.clearTimeout(timeoutId);
  }
};

const redirectToLogin = () => {
  if (typeof window !== "undefined") {
    window.location.assign("/login");
    return;
  }

  return import("next/navigation").then(({ redirect }) => redirect("/login"));
};

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error: AxiosError<Error>) => {
    const original = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Server Components에서 내부 refresh API를 호출해도 Set-Cookie를 원래 응답에
    // 전달할 수 없으므로, 만료된 세션은 명시적으로 로그인으로 보낸다.
    if (typeof window === "undefined") {
      await redirectToLogin();
      return Promise.reject(error);
    }

    // 새 토큰으로 재시도한 요청까지 401이면 세션을 복구할 수 없다.
    if (original._retry) {
      window.location.assign("/login");
      return Promise.reject(error);
    }

    // 토큰 갱신 중이면 큐에 추가
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push((token) => {
          if (token) {
            original.headers = original.headers ?? {};
            original.headers.Authorization = `Bearer ${token}`;
            resolve(api(original));
          } else {
            reject(error);
          }
        });
      });
    }

    original._retry = true;
    isRefreshing = true;

    try {
      const accessToken = await refreshAccessToken();

      // 큐에 있는 요청들에 새 토큰 전달
      queue.forEach((cb) => cb(accessToken));
      queue = [];

      original.headers = original.headers ?? {};
      original.headers.Authorization = `Bearer ${accessToken}`;
      return api(original);
    } catch (e) {
      // 큐에 있는 요청들 실패 처리
      queue.forEach((cb) => cb());
      queue = [];
      await redirectToLogin();

      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
