import { useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { StudentApi } from "@/entities/students/api";
import { Student } from "@/entities/students/types";
import { CLASSES } from "@/shared/constants/grade";

export const useAllInGrade = (
  grade: number,
  selectedStudents: number[],
  toggleSelected: (studentId: number, student?: Student) => void,
) => {
  const queryClient = useQueryClient();

  const getCachedStudents = () =>
    CLASSES.flatMap(
      (classNumber) =>
        queryClient.getQueryData<AxiosResponse<Student[]>>([
          "students",
          grade,
          classNumber,
        ])?.data ?? [],
    );

  const isSomeSelected = getCachedStudents().some((student) =>
    selectedStudents.includes(student.id),
  );

  const selectAllInGrade = async () => {
    const results = await Promise.all(
      CLASSES.map((classNumber) =>
        queryClient.fetchQuery({
          queryKey: ["students", grade, classNumber],
          queryFn: async () =>
            await StudentApi.getStudentByClass(grade, classNumber),
        }),
      ),
    );
    const students = results
      .flatMap((result) => result.data)
      .filter((student) => !student.typeId);

    const hasSelected = students.some((student) =>
      selectedStudents.includes(student.id),
    );

    students.forEach((student) => {
      const isSelected = selectedStudents.includes(student.id);
      if (hasSelected === isSelected) {
        toggleSelected(student.id, student);
      }
    });
  };

  return { isSomeSelected, selectAllInGrade };
};
