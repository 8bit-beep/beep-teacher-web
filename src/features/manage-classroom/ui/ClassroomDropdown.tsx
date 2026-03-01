"use client";

import { Attendance } from "@/entities/attendances/types";
import { Dropdown } from "@bds-web/ui";
import { useUpdateClassroom } from "../hooks/useUpdateClassroom";

interface Props {
  data: Attendance;
  statusIndex: number;
}

const ClassroomDropdown = ({ data, statusIndex }: Props) => {
  const { status, setStatus, options } = useUpdateClassroom(data, statusIndex);

  return (
    <div className={`${status?.name === "미출석" ? "border-2 border-[#EF5A5A] rounded-large" : ""}`}>
      <Dropdown
        selected={status}
        onSelect={setStatus}
        options={options}
        dropdownSize="medium"
        width="180px"
      />
    </div>
  );
};

export default ClassroomDropdown;
