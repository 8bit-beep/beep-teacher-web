"use client";

import ChevronIcon from "@/shared/icons/ChevronIcon";
import { Checkbox } from "@beep-ds/ui";
import StudentItem from "./StudentItem";
import { useAllInClass } from "../hooks/useAllInClass";

interface Props {
  grade: number;
  classNumber: number;
  selectedStudents: number[];
  toggleSelected: (studentId: number) => void;
}

const ClassAccordion = ({
  grade,
  classNumber,
  selectedStudents,
  toggleSelected,
}: Props) => {
  const { isOpened, setIsOpened, students, selectAllInClass } = useAllInClass(
    selectedStudents,
    grade,
    classNumber,
    toggleSelected,
  );

  return (
    <div>
      <div
        className="w-full pr-5 pl-5.5 py-2.5 border-b border-greyscale-20 flex items-center gap-3 bg-greyscale-10 cursor-pointer"
        onClick={() => setIsOpened((prev) => !prev)}>
        <p className="text-h4 text-blue-dark">{classNumber}반</p>
        <div className="flex-1" />
        <div onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={selectedStudents.some((studentId) =>
              students.find((student) => student.id === studentId),
            )}
            onChange={selectAllInClass}
            size={20}
          />
        </div>

        <ChevronIcon size={16} rotate={isOpened ? 180 : 0} />
      </div>
      {isOpened &&
        students.map((student) => (
          <StudentItem
            data={student}
            key={student.id}
            selectedStudents={selectedStudents}
            toggleSelected={toggleSelected}
          />
        ))}
    </div>
  );
};

export default ClassAccordion;
