import api from "@/shared/libs/api";
import { AttendType } from "../types";

export const AttendTypeApi = {
  getAttendTypes: async () => {
    return await api.get<AttendType[]>("/types");
  },
};
