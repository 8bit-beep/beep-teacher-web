import api from "@/shared/libs/api"
import { PageResponse } from "@/shared/types/page-response";
import { Attendance } from "../types";

export const AttendanceApi = {
  getAttendancesByRoomId: async (roomId: number) => {
    return await api.get<PageResponse<Attendance>>(`/attendances?roomId=${roomId}&isCurrentCheckpoint=true`);
  },

  getAttendacnesByRoomIdWithAllCheckpoitns: async (roomId: number) => {
    return await api.get(`/attendances?roomId=${roomId}&isCurrentCheckpoint=false`);
  },

  updateAttendanceStatus: async (data: { userId: number, statusId: number }) => {
    return await api.patch(`/attendances/status`, data);
  },

  updatePastAttendanceStatus: async (data: { userId: number, statusId: number, date: string, checkpointId: number }) => {
    return await api.patch(`/attendances/status`, data);
  }
}