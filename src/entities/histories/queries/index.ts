import { useSuspenseQuery } from "@tanstack/react-query";
import { HistoryApi } from "../api";

export const useGetHistories = (
  roomId: number,
  date: string,
  checkpointId: number,
) => {
  return useSuspenseQuery({
    queryKey: ["histories", roomId, date, checkpointId],
    queryFn: async () =>
      await HistoryApi.getHistories(roomId, date, checkpointId),
  });
};
