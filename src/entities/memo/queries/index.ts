import { useSuspenseQuery } from "@tanstack/react-query";
import { MemoApi } from "../api";

export const useGetMemo = (grade: number) => {
  return useSuspenseQuery({
    queryKey: ["memos", grade],
    queryFn: () => MemoApi.getMemo(grade),
    refetchInterval: 5000,
  });
};
