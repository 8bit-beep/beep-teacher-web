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
    <>
      <div className={`hidden lg:block ${status?.name === "미출석" ? "border-2 border-red-light rounded-large" : ""}`}>
        <Dropdown
          selected={status}
          onSelect={setStatus}
          options={options}
          dropdownSize="medium"
          width="180px"
        />
      </div>
      <div className={`lg:hidden ${status?.name === "미출석" ? "border-2 border-red-light rounded-large" : ""}`}>
        <Dropdown
          selected={status}
          onSelect={setStatus}
          options={options}
          dropdownSize="medium"
          width="100%"
        />
      </div>
    </>
  );
};

export default ClassroomDropdown;
