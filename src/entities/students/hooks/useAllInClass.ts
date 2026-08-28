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
