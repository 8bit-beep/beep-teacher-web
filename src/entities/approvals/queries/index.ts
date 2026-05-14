import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { parseDate } from "@/shared/utils/pare-date";
import { ApprovalApi } from "../api";
import type { Approval } from "../types";

interface ApprovalListQueryParams {
  date?: string;
  floor?: string;
}

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

export const useApprovalListQuery = (params: ApprovalListQueryParams) => {
  return useQuery({
    queryKey: ["approval-list", params.date, params.floor],
    queryFn: async () => {
      const { data } = await ApprovalApi.getAllApprovals();

      return data.filter((approval: Approval) => {
        if (params.date === "today") {
          if (!approval.approvedAt) {
            return false;
          }

          if (!approval.approvedAt.startsWith(parseDate(new Date()))) {
            return false;
          }
        }

        if (params.floor) {
          if (params.floor === "other") {
            return !["1", "2", "3"].includes(String(approval.room.floor));
          }

          return String(approval.room.floor) === params.floor;
        }

        return true;
      });
    },
  });
};
