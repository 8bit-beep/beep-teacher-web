import api from "@/shared/libs/api";
import {
  AbsenceReasonsResponseDto,
  AbsenceRequestDto,
  AbsenceResponseDto,
} from "../types/dto";
import { PageResponse } from "@/shared/types/page-response";
import { Absence } from "../types";

export const AbsenceApi = {
  createAbsence: async (data: AbsenceRequestDto) => {
    return await api.post<AbsenceResponseDto>("/absences", data);
  },

  getAbsences: async (page: number) => {
    return await api.get<PageResponse<Absence>>(
      `/absences?page=${page}&size=10`,
    );
  },

  updateAbsence: async (absenceId: number, data: AbsenceRequestDto) => {
    return await api.patch<AbsenceResponseDto>(`/absences/${absenceId}`, data);
  },

  deleteAbsence: async (absenceId: number) => {
    return await api.delete(`/absences/${absenceId}`);
  },

  getReasons: async () => {
    return await api.get<AbsenceReasonsResponseDto>("/absences/reasons");
  },
};
