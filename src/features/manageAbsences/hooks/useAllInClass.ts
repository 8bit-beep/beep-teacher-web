import { useGetStudentsByClass } from "@/entities/students/queries";
import { useState } from "react";

export const useAllInClass = (
  selectedStudents: number[],
  grade: number,
  classNumber: number,
  toggleSelected: (studentId: number) => void,
) => {
  const students = useGetStudentsByClass(grade, classNumber).data.data.content;
  const [isOpened, setIsOpened] = useState(false);

  const selectAllInClass = () => {
    const allSelected = selectedStudents.some((studentId) =>
      students.find((student) => student.id === studentId),
    );
    if (allSelected) {
      students.forEach((student) => {
        if (selectedStudents.includes(student.id)) {
          toggleSelected(student.id);
        }
      });
    } else {
      students.forEach((student) => {
        if (!selectedStudents.includes(student.id)) {
          toggleSelected(student.id);
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
