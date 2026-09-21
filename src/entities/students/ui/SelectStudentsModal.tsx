"use client";

import { modal } from "@beep-ds/ui";
import { Student } from "../types";
import { useSelectStudents } from "../hooks/useSelectStudents";
import SelectStudents from "./SelectStudents";

interface Props {
  initialSelectedStudents: number[];
  onApply: (selectedStudents: number[]) => void;
  getLockedStatusName?: (student: Student) => string | undefined;
}

const SelectStudentsModal = ({
  initialSelectedStudents,
  onApply,
  getLockedStatusName,
}: Props) => {
  const { selectedStudents, toggleSelected } = useSelectStudents(
    initialSelectedStudents,
  );

  return (
    <SelectStudents
      selectedStudents={selectedStudents}
      toggleSelected={toggleSelected}
      getLockedStatusName={getLockedStatusName}
      onDone={() => {
        onApply(selectedStudents);
        modal.close();
      }}
    />
  );
};

export default SelectStudentsModal;
