"use client";

import { modal } from "@bds-web/ui";
import { useSelectStudents } from "../hooks/useSelectStudents";
import SelectStudents from "./SelectStudents";

interface Props {
  initialSelectedStudents: number[];
  onApply: (selectedStudents: number[]) => void;
}

const SelectStudentsModal = ({
  initialSelectedStudents,
  onApply,
}: Props) => {
  const { selectedStudents, toggleSelected } = useSelectStudents(
    initialSelectedStudents,
  );

  return (
    <SelectStudents
      selectedStudents={selectedStudents}
      toggleSelected={toggleSelected}
      onDone={() => {
        onApply(selectedStudents);
        modal.close();
      }}
    />
  );
};

export default SelectStudentsModal;
