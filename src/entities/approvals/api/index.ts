import api from "@/shared/libs/api";
import { Approval } from "../types";

export const ApprovalApi = {
  getCurrentApprovalByRoomId: async (roomId: number) => {
    return await api.get<Approval>(`/rooms/${roomId}/approvals`);
  },

  getAllApprovals: async (floor?: string) => {
    let data: Approval[] = [];
    try {
      data = (await api.get<Approval[]>("/approvals")).data;
    } catch {
      data = [];
    }

    if (floor) {
      return {
        data: data.filter((approval) => approval.room.floor === Number(floor)),
      };
    }
    return { data };
  },

  approveRoom: async (roomId: number) => {
    return await api.post(`/rooms/${roomId}/approvals`);
  },

  cancelApproval: async (roomId: number) => {
    return await api.delete(`/rooms/${roomId}/approvals`);
  },
};
