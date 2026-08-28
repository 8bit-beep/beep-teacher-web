"use client";

import { Dropdown } from "@beep-ds/ui";
import { useFilterClassroom } from "../hooks/useFilterClassroom";
import { CLASSROOM_OPTIONS } from "../constants/classroom";

const FilterClassroom = () => {
  const { classroom, setClassroom } = useFilterClassroom();

  return (
    <Dropdown selected={classroom} onSelect={setClassroom} options={CLASSROOM_OPTIONS} dropdownSize="medium" />
  ) 
}

export default FilterClassroom