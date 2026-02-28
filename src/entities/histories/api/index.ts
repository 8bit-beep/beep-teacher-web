import { Attendance } from "@/entities/attendances/types";
import api from "@/shared/libs/api";

export const HistoryApi = {  
  getAllCheckpointHistories: async (roomId: number, date: string) => {
    return await api.get<Attendance[]>(
      `/attendances/all-checkpoints?roomId=${roomId}&date=${date}`,
    );
  },

  updateHistory: async (data: {
    userId: number;
    statusId: number;
    date: string;
    checkpointId: number;
  }) => {
    return await api.patch(`/attendances/status`, data);
  },

  getExcel: async (date: string) => {
    return await api.get<{ url: string }>(
      `/attendances/histories/download?date=${date}`,
    );
  },
};
