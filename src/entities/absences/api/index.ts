import api from "@/shared/libs/api";
import { CreateAbsenceDto, CreateAbsenceResponseDto } from "../types/dto";

export const AbsenceApi = {
  createAbsence: async (data: CreateAbsenceDto) => {
    return await api.post<CreateAbsenceResponseDto>("/absences", data);
  }
};