import { useSuspenseQuery } from "@tanstack/react-query";
import { UserApi } from "../api";

export const useGetMe = () => {
  return useSuspenseQuery({
    queryKey: ["getMe"],
    queryFn: UserApi.getMe,
  });
};
