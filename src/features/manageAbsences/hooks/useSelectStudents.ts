import { useState } from "react";

export const useSelectStudents = () => {
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);

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
