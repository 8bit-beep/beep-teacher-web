import { useSuspenseQuery } from "@tanstack/react-query";
import { ApprovalApi } from "../api";

export const useGetCurrentApprovalByRoomId = (roomId: number) => {
  return useSuspenseQuery({
    queryKey: ["approvals", roomId],
    queryFn: async () => {
      try {
        const data = (await ApprovalApi.getCurrentApprovalByRoomId(roomId))
          .data;
        return {
          approved: data.approved,
          approvedTeacherUsername: data.approvedTeacher?.username,
          approvedAt: data.approvedAt,
        };
      } catch {
        return {
          approved: false,
          approvedTeacherUsername: null,
          approvedAt: null,
        };
      }
    },
  });
};
