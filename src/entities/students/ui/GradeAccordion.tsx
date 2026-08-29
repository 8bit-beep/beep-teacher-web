"use client";
import { Student } from "@/entities/students/types";

import ChevronIcon from "@/shared/icons/ChevronIcon";
import { Checkbox } from "@beep-ds/ui";
import { useState } from "react";
import { CLASSES } from "@/shared/constants/grade";
import { useAllInGrade } from "../hooks/useAllInGrade";
import ClassAccordion from "./ClassAccordion";

interface Props {
  grade: number;
  selectedStudents: number[];
  toggleSelected: (studentId: number, student?: Student) => void;
}

const GradeAccordion = ({ grade, selectedStudents, toggleSelected }: Props) => {
  const [isOpened, setIsOpened] = useState(false);
  const { isSomeSelected, selectAllInGrade } = useAllInGrade(
    grade,
    selectedStudents,
    toggleSelected,
  );

  return (
    <div className="w-full">
      <div
        className="w-full px-5 py-2.5 border-b border-greyscale-20 flex items-center gap-3 cursor-pointer"
        onClick={() => setIsOpened((prev) => !prev)}>
        <p className="text-h4 text-blue-dark">{grade}학년</p>
        <div className="flex-1" />
        <div onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={isSomeSelected}
            onChange={selectAllInGrade}
            size={20}
          />
        </div>
        <ChevronIcon size={16} rotate={isOpened ? 180 : 0} />
      </div>
      {isOpened &&
        CLASSES.map((classNumber) => (
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
