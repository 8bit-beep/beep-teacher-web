"use client";

import { Attendance } from "@/entities/attendances/types";
import AttendanceStatusDropdown from "./AttendanceStatusDropdown";

interface Props {
  data: Attendance;
  roomId: number;
  index: number;
}

const ManageHistoryItem = ({ data, roomId, index }: Props) => {
  return (
    <div
      className={`w-full h-14 flex items-center px-5 py-3 gap-4 ${index % 2 === 0 ? "bg-[#EFF8FF]" : "bg-white"}`}>
      <p className="text-body text-greyscale-40">{data.studentId}</p>
      <p className="text-accent text-static-black">{data.username}</p>
      <div className="flex-1"/>
      {data.statuses.map((statusItem, statusIndex) => (
        <AttendanceStatusDropdown
          key={statusItem.checkpoint.id}
          data={data}
          roomId={roomId}
          index={statusIndex}
        />
      ))}
    </div>
  );
};

export default ManageHistoryItem;