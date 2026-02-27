"use client";

import { Attendance } from "@/entities/attendances/types";
import { Dropdown } from "@bds-web/ui";
import { useUpdateHistory } from "../hooks/useUpdateHistory";

interface Props {
  data: Attendance;
  roomId: number;
  index: number;
}

const HistoryStatusDropdown = ({ data, roomId, index }: Props) => {
  const { status, setStatus, options } = useUpdateHistory(data, roomId, index);

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

export default HistoryStatusDropdown;