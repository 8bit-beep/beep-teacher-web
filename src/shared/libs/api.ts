import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getAccessToken } from "./cookie";
import type { Error } from "../types/error";

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

    // 401 에러가 아니거나 이미 재시도한 경우 에러 반환
    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    // 서버 사이드에서는 refresh를 시도하지 않는다.
    // refreshToken이 1회용(회전)이라 SSR 중 갱신하면 새 토큰을 브라우저에
    // 전달할 방법이 없어 세션이 어긋난다. 만료 토큰 갱신은 미들웨어가 담당한다.
    if (typeof window === "undefined") {
      const { redirect } = await import("next/navigation");
      redirect("/login");
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
      const refreshRes = await fetch(
        `${process.env.NEXT_PUBLIC_WEB_URL}/api/auth/refresh`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (!refreshRes.ok) {
        throw new Error("Token refresh failed");
      }

      const { accessToken } = await refreshRes.json();

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

      window.location.href = "/login";

      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
