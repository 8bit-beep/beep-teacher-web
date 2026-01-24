import api from "@/shared/libs/api";
import { Student } from "../types";

export const StudentApi = {
  getStudentByClass: async (grade: number, classNumber: number) => {
    return await api.get<Student[]>(
      `/students?grade=${grade}&classNumber=${classNumber}`,
    );
  },

  getStudentByKeyword: async (keyword: string) => {
    if (!keyword.trim())
      return {
        data: [],
      };
    return await api.get<Student[]>(`/students?keyword=${keyword}`);
  },
};
