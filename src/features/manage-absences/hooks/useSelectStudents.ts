import { useState } from "react";

export const useSelectStudents = (initData?: number[]) => {
  const [selectedStudents, setSelectedStudents] = useState<number[]>(initData || []);

  const toggleSelected = (studentId: number) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents((prev) => prev.filter((id) => id !== studentId));
    } else {
      setSelectedStudents((prev) => [...prev, studentId]);
    }
  };

  return {
    selectedStudents,
    toggleSelected,
  };
};
