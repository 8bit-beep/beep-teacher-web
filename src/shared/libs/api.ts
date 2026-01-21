import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";
import type { IncomingMessage, ServerResponse } from "http";
import { getCookie, setCookie } from "./cookie";

interface SSRContext {
  req?: IncomingMessage;
  res?: ServerResponse;
};

let isRefreshing = false;
let requestQueue: Array<(token: string) => void> = [];

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const ssr: SSRContext =
    (typeof (config as unknown) === "object" &&
      (config as { ssr?: SSRContext }).ssr) ||
    {};
  const accessToken = getCookie("accessToken", ssr.req);
  if (accessToken) {
    config.headers = config.headers || {};
    (config.headers as Record<string, string>)["Authorization"] =
      `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
      ssr?: SSRContext;
    };
    const ssr = originalRequest.ssr || {};
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          requestQueue.push((token: string) => {
            (originalRequest.headers as Record<string, string>)[
              "Authorization"
            ] = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }
      originalRequest._retry = true;
      isRefreshing = true;
      try {
        const refreshToken = getCookie("refreshToken", ssr.req);
        const refreshRes = await api.post("/auth/refresh", { refreshToken });
        const newAccessToken = refreshRes.data.accessToken;
        const newRefreshToken = refreshRes.data.refreshToken;
        setCookie("accessToken", newAccessToken, undefined, ssr.res);
        setCookie("refreshToken", newRefreshToken, undefined, ssr.res);
        requestQueue.forEach((cb) => cb(newAccessToken));
        requestQueue = [];
        (originalRequest.headers as Record<string, string>)["Authorization"] =
          `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        requestQueue = [];
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);

export default api;
