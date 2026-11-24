"use client";

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const makeQueryClient = () => new QueryClient();

let browserQueryClient: QueryClient | undefined;

// 서버에서는 요청(렌더)마다 새 QueryClient를 만든다.
// 모듈 스코프 싱글턴을 쓰면 같은 서버 인스턴스의 모든 사용자가 캐시를 공유해
// 한 사용자의 401 리다이렉트 에러나 응답 데이터가 다른 사용자의 SSR에 재사용된다. (#156)
// 브라우저에서는 페이지 이동 간 캐시를 유지하도록 싱글턴을 재사용한다.
const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }

  return browserQueryClient;
};

const QueryProvider = ({ children }: PropsWithChildren) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
