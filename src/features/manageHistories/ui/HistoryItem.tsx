"use client";

import { Attendance } from "@/entities/attendances/types";
import { Dropdown } from "@bds-web/ui";
import { useUpdateHistory } from "../hooks/useUpdateHistory";

interface Props {
  data: Attendance;
  roomId: number;
}

const HistoryItem = ({ data, roomId }: Props) => {
  const { status, setStatus, options } = useUpdateHistory(
    data,
    roomId,
  );

  return (
    <div
      className={`w-full h-14 flex items-center px-4 gap-4 ${data.statuses[0].status ? (data.statuses[0].status.name === "외박" ? "bg-red-light" : data.statuses[0].status.name === "외박" ? "bg-green-light" : "bg-static-white") : "bg-greyscale-10"}`}>
      <p className="text-caption1 text-greyscale-40">{data.studentId}</p>
      <p className="text-h4 text-static-black">{data.username}</p>
      <div className="flex-1" />
      <Dropdown selected={status} onSelect={setStatus} options={options} />
    </div>
  );
};

export default HistoryItem;
