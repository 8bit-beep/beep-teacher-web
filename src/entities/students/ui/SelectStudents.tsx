"use client";
import { Student } from "@/entities/students/types";

import SearchBar from "./SearchBar";
import GradeAccordion from "./GradeAccordion";
import { Button } from "@beep-ds/ui";
import { GRADES } from "@/shared/constants/grade";
import { useSearch } from "../hooks/useSearch";
import StudentItem from "./StudentItem";

interface Props {
  selectedStudents: number[];
  toggleSelected: (studentId: number, student?: Student) => void;
  onDone: () => void;
  getLockedStatusName?: (student: Student) => string | undefined;
}

const SelectStudents = ({
  selectedStudents,
  toggleSelected,
  onDone,
  getLockedStatusName,
}: Props) => {
  const { onChange, query, result } = useSearch();

  return (
    <div className="w-full flex flex-col gap-5">
      <SearchBar query={query} onChange={onChange} />
      <div className="w-full max-h-84 overflow-y-scroll">
        {result.length > 0
          ? result.map((student) => (
              <StudentItem
                data={student}
                selectedStudents={selectedStudents}
                toggleSelected={toggleSelected}
                getLockedStatusName={getLockedStatusName}
                key={student.id}
              />
            ))
          : GRADES.map((grade) => (
              <GradeAccordion
                grade={grade}
                selectedStudents={selectedStudents}
                toggleSelected={toggleSelected}
                getLockedStatusName={getLockedStatusName}
                key={grade}
              />
            ))}
      </div>
      <Button
        buttonSize="large"
        buttonType="primary"
        onClick={onDone}>
        선택 완료
      </Button>
    </div>
  );
};

export default SelectStudents;
