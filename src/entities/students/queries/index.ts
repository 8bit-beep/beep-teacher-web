import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { StudentApi } from "../api";

export const useGetStudentsByClass = (grade: number, classNumber: number) => {
  return useSuspenseQuery({
    queryKey: ["students", grade, classNumber],
    queryFn: async () => await StudentApi.getStudentByClass(grade, classNumber),
  });
};

export const useGetStudentsByKeyword = (keyword: string) => {
  return useQuery({
    queryKey: ["students", "search", keyword],
    queryFn: async () => await StudentApi.getStudentByKeyword(keyword),
  });
};

export const useGetStudentsByClassOptional = (
  grade?: number,
  classNumber?: number,
) => {
  return useQuery({
    queryKey: ["students", grade, classNumber],
    queryFn: async () => await StudentApi.getStudentByClass(grade!, classNumber!),
    enabled: grade !== undefined && classNumber !== undefined,
  });
};
