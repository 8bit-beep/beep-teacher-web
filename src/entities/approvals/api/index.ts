import api from "@/shared/libs/api";
import { Approval } from "../types";

export const ApprovalApi = {
  getCurrentApprovalByRoomId: async (roomId: number) => {
    return await api.get<Approval>(`/rooms/${roomId}/approvals`);
  },

  approveRoom: async (roomId: number) => {
    return await api.post(`/rooms/${roomId}/approvals`);
  },

  cancelApproval: async (roomId: number) => {
    return await api.delete(`/rooms/${roomId}/approvals`);
  },
}