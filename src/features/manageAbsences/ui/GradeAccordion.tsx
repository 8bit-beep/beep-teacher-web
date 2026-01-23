"use client";

import ChevronIcon from "@/shared/icons/ChevronIcon";
import { useState } from "react";
import ClassAccordion from "./ClassAccordion";

interface Props {
  grade: number;
  selectedStudents: number[];
  toggleSelected: (studentId: number) => void;
}

const GradeAccordion = ({ grade, selectedStudents, toggleSelected }: Props) => {
  const [isOpened, setIsOpened] = useState(false);
  

  return (
    <div className="w-full">
      <div
        className="w-full px-5 py-2.5 border-b border-greyscale-20 flex items-center gap-3"
        onClick={() => setIsOpened((prev) => !prev)}>
        <p className="text-h4 text-blue-dark">{grade}학년</p>
        <div className="flex-1" />
        <ChevronIcon size={16} rotate={isOpened ? 180 : 0} />
      </div>
      {isOpened &&
        [1, 2, 3, 4].map((classNumber) => (
          <ClassAccordion
            grade={grade}
            classNumber={classNumber}
            selectedStudents={selectedStudents}
            toggleSelected={toggleSelected}
            key={classNumber}
          />
        ))}
    </div>
  );
};

export default GradeAccordion;
