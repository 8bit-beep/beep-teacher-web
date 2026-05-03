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
          approvedTeacherName: data.approvedTeacher?.name,
          approvedAt: data.approvedAt,
        };
      } catch {
        return {
          approved: false,
          approvedTeacherName: null,
          approvedAt: null,
        };
      }
    },
  });
};
