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

    // 토큰 갱신 중이면 큐에 추가
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push((token) => {
          if (token) {
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

      original.headers.Authorization = `Bearer ${accessToken}`;
      return api(original);
    } catch (e) {
      // 큐에 있는 요청들 실패 처리
      queue.forEach((cb) => cb());
      queue = [];
      
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      } else {
        const { redirect } = await import("next/navigation");
        redirect("/login");
      }
      
      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
