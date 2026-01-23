import api from "@/shared/libs/api";
import { PageResponse } from "@/shared/types/page-response";
import { Student } from "../types";

export const StudentApi = {
  getStudentByClass: async (grade: number, classNumber: number) => {
    return await api.get<PageResponse<Student>>(
      `/students?grade=${grade}&classNumber=${classNumber}`,
    );
  },

  getStudentByKeyword: async (keyword: string) => {
    if (!keyword.trim())
      return {
        data: {
          content: [],
          totalElements: 0,
          totalPages: 0,
          size: 0,
          number: 0,
        },
      };
    return await api.get<PageResponse<Student>>(`/students?keyword=${keyword}`);
  },
};
