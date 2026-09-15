"use client";

import { Attendance } from "@/entities/attendances/types";
import { Dropdown, DropdownOpenDirection } from "@beep-ds/ui";
import { useUpdateClassroom } from "../hooks/useUpdateClassroom";

interface Props {
  data: Attendance;
  statusIndex: number;
  desktopWidth?: string;
  openDirection?: DropdownOpenDirection;
}

const ClassroomDropdown = ({ data, statusIndex, desktopWidth = "180px", openDirection = "down" }: Props) => {
  const { status, setStatus, options } = useUpdateClassroom(data, statusIndex);

  return (
    <>
      <div className={`hidden lg:block ${status?.name === "미출석" ? "rounded-large outline-2 outline-red-light" : ""}`}>
        <Dropdown
          selected={status}
          onSelect={setStatus}
          options={options}
          dropdownSize="medium"
          width={desktopWidth}
          openDirection={openDirection}
        />
      </div>
      <div className={`lg:hidden ${status?.name === "미출석" ? "rounded-large outline-2 outline-red-light" : ""}`}>
        <Dropdown
          selected={status}
          onSelect={setStatus}
          options={options}
          dropdownSize="medium"
          width="100%"
          openDirection={openDirection}
        />
      </div>
    </>
  );
};

export default ClassroomDropdown;
