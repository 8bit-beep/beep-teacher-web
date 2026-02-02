import api from "@/shared/libs/api";
import { Attendance } from "../types";

export const AttendanceApi = {
  getAttendancesByRoomId: async (roomId: number) => {
    try {
      return await api.get<Attendance[]>(
        `/attendances?roomId=${roomId}&isCurrentCheckpoint=true`,
      );
    } catch {
      return { data: [] as Attendance[] };
    }
  },

  getAttendancesByClassroom: async (grade: number, classNumber: number) => {
    try {
      return await api.get<Attendance[]>(
        `/attendances?grade=${grade}&classNumber=${classNumber}&isCurrentCheckpoint=false`,
      );
    } catch {
      return { data: [] as Attendance[] };
    }
  },

  getAttendancesByRoomIdWithAllCheckpoints: async (roomId: number) => {
    return await api.get(
      `/attendances?roomId=${roomId}&isCurrentCheckpoint=false`,
    );
  },

  updateAttendanceStatus: async (data: {
    userId: number;
    statusId: number;
  }) => {
    return await api.patch(`/attendances/status`, data);
  },

  updateAttendanceStatusWithCheckpoint: async (data: {
    userId: number;
    statusId: number;
    checkpointId: number;
  }) => {
    return await api.patch(`/attendances/status`, data);
  },
};
