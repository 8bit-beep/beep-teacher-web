"use client";

import { Attendance } from "@/entities/attendances/types";
import { Dropdown } from "@beep-ds/ui";
import { useUpdateHistory } from "@/features/manage-histories/hooks/useUpdateHistory";

interface Props {
  data: Attendance;
  roomId: number;
  index: number;
  desktopWidth?: string;
}

const ManageHistoryDropdown = ({ data, roomId, index, desktopWidth = "180px" }: Props) => {
  const { status, setStatus, options } = useUpdateHistory(data, roomId, index);
  const shouldHighlightAbsent = status?.name === "미출석";

  return (
    <div
      className={
        shouldHighlightAbsent ? "border-2 border-[#EF5A5A] rounded-large" : ""
      }
    >
      <div className="hidden lg:block">
        <Dropdown
          selected={status}
          onSelect={setStatus}
          options={options}
          dropdownSize="medium"
          width={desktopWidth}
        />
      </div>
      <div className="lg:hidden">
        <Dropdown
          selected={status}
          onSelect={setStatus}
          options={options}
          dropdownSize="medium"
          width="100%"
        />
      </div>
    </div>
  );
};

export default ManageHistoryDropdown;
