import { useSuspenseQuery } from "@tanstack/react-query";
import { MemoApi } from "../api";

export const useGetMemo = () => {
  return useSuspenseQuery({
    queryKey: ["memos"],
    queryFn: MemoApi.getMemo,
  });
};
