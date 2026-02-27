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

  return <Dropdown selected={status} onSelect={setStatus} options={options} />;
};

export default HistoryStatusDropdown;