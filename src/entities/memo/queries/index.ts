import { useSuspenseQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MemoApi } from "../api";
import { Error } from "@/shared/types/error";

export const useGetMemo = (grade: number) => {
  return useSuspenseQuery({
    queryKey: ["memos", grade],
    queryFn: async () => {
      try {
        return await MemoApi.getMemo(grade);
      } catch (error) {
        const axiosError = error as AxiosError<Error>;

        if (axiosError.response?.status === 404) {
          return {
            data: {
              content: "",
              isRead: true,
              exists: false,
            },
          };
        }

        throw error;
      }
    },
    refetchInterval: 5000,
  });
};
