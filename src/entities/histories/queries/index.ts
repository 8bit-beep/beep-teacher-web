import { useSuspenseQuery } from "@tanstack/react-query";
import { HistoryApi } from "../api";

export const useGetAllCheckpointHistories = (roomId: number, date: string) => {
  return useSuspenseQuery({
    queryKey: ["histories", "all-checkpoints", roomId, date],
    queryFn: async () => await HistoryApi.getAllCheckpointHistories(roomId, date),
  });
};