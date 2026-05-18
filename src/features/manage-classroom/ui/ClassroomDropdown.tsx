"use client";

import { Attendance } from "@/entities/attendances/types";
import { Dropdown } from "@bds-web/ui";
import { useUpdateClassroom } from "../hooks/useUpdateClassroom";

interface Props {
  data: Attendance;
  statusIndex: number;
  desktopWidth?: string;
}

const ClassroomDropdown = ({ data, statusIndex, desktopWidth = "180px" }: Props) => {
  const { status, setStatus, options } = useUpdateClassroom(data, statusIndex);

  const borderClass =
    status?.name === "미출석"
      ? "border-2 border-red-light rounded-large"
      : status?.name === "외출"
        ? "border-2 border-green-light rounded-large"
        : "";

  return (
    <>
      <div className={`hidden lg:block ${borderClass}`}>
        <Dropdown
          selected={status}
          onSelect={setStatus}
          options={options}
          dropdownSize="medium"
          width={desktopWidth}
        />
      </div>
      <div className={`lg:hidden ${borderClass}`}>
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
