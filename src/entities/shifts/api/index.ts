import api from "@/shared/libs/api";
import { Shift, ShiftStatus } from "../types";

export const ShiftApi = {
  getShifts: async () => {
    return await api.get<Shift[]>("/shifts");
  },

  updateShiftStatus: async (shiftId: number, status: ShiftStatus) => {
    return await api.patch(`/shifts/${shiftId}/status?status=${status}`);
  },
};
