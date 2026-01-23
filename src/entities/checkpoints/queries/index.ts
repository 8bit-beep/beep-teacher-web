import { useSuspenseQuery } from "@tanstack/react-query";
import { CheckpointApi } from "../api";

export const useGetCheckpoints = () => {
  return useSuspenseQuery({
    queryKey: ["checkpoints"],
    queryFn: CheckpointApi.getCheckpoints,
  });
};
