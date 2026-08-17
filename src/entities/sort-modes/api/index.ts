import api from "@/shared/libs/api";
import { AttendanceSortModes } from "../types";

export const SortModeApi = {
  getSortModes: async () => {
    return await api.get<AttendanceSortModes>("/attendance-sort-modes");
  },

  updateSortMode: async (data: { grade: number; typeId?: number }) => {
    return await api.patch<AttendanceSortModes>("/attendance-sort-modes", data);
  },
};
