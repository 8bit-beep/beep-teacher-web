import { useSuspenseQuery } from "@tanstack/react-query";
import { ApprovalApi } from "../api";

export const useGetCurrentApprovalByRoomId = (roomId: number) => {
  return useSuspenseQuery({
    queryKey: ["approvals", roomId],
    queryFn: async () => {
      try {
        return (await ApprovalApi.getCurrentApprovalByRoomId(roomId)).data.approved;
      } catch {
        return false;
      }
    },
  });
};
