"use client";

import { Attendance } from "@/entities/attendances/types";
import { Dropdown } from "@bds-web/ui";
import { useUpdateHistory } from "../hooks/useUpdateHistory";

interface Props {
  data: Attendance;
  roomId: number;
  index: number;
}

const HistoryItem = ({ data, roomId, index }: Props) => {
  const { status, setStatus, options } = useUpdateHistory(
    data,
    roomId,
  );

  return (
    <div
      className={`w-full h-14 flex items-center px-5 py-3 gap-4 ${index % 2 === 0 ? "bg-[#EFF8FF]" : "bg-white"}`}>
      <p className="text-body text-greyscale-40">{data.studentId}</p>
      <p className="text-accent text-static-black">{data.username}</p>
      <div className="flex-1"/>
      <Dropdown selected={status} onSelect={setStatus} options={options} />
      <Dropdown selected={status} onSelect={setStatus} options={options} />
      <Dropdown selected={status} onSelect={setStatus} options={options} />
    </div>
  );
};

export default HistoryItem;
