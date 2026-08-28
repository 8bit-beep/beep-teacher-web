import { useGetStudentsByClass } from "@/entities/students/queries";
import { Student } from "@/entities/students/types";
import { useState } from "react";

export const useAllInClass = (
  selectedStudents: number[],
  grade: number,
  classNumber: number,
  toggleSelected: (studentId: number, student?: Student) => void,
) => {
  const students = useGetStudentsByClass(grade, classNumber).data.data;
  const [isOpened, setIsOpened] = useState(false);

  // 외박·외출 등 상태가 있는 학생은 선택 대상에서 제외한다
  const selectableStudents = students.filter((student) => !student.typeId);

  const selectAllInClass = () => {
    const allSelected = selectedStudents.some((studentId) =>
      selectableStudents.find((student) => student.id === studentId),
    );
    if (allSelected) {
      selectableStudents.forEach((student) => {
        if (selectedStudents.includes(student.id)) {
          toggleSelected(student.id, student);
        }
      });
    } else {
      selectableStudents.forEach((student) => {
        if (!selectedStudents.includes(student.id)) {
          toggleSelected(student.id, student);
        }
      });
    }
  };

  return {
    isOpened,
    setIsOpened,
    students,
    selectAllInClass,
  }
};
