"use client";

import { Attendance } from "@/entities/attendances/types";
import { Dropdown } from "@bds-web/ui";
import { useUpdateAttendance } from "../hooks/useUpdateAttendance";

interface Props {
  data: Attendance;
  roomId: number;
}

const AttendanceItem = ({ data, roomId }: Props) => {
  const { status, setStatus, options } = useUpdateAttendance(data, roomId);

  const currentStatus = data.statuses[0].status?.name;
  const isAbsent = !currentStatus;

  return (
    <div
      className={`w-full h-15 flex items-center px-4 gap-4 ${currentStatus ? (currentStatus === "외박" ? "bg-red-light" : currentStatus === "외출" ? "bg-green-light" : "bg-static-white") : "bg-greyscale-10"}`}>
      <div
        className={`w-4.5 h-4.5 rounded-full shrink-0 ${isAbsent ? "bg-yellow-400" : "bg-transparent"}`}
      />
      <p className={`text-body ${currentStatus === "외박" || currentStatus === "외출" ? "text-greyscale-10" : "text-greyscale-40"}`}>{data.studentId}</p>
      <p className={`text-h4 ${currentStatus === "외박" || currentStatus === "외출" ? "text-white" : "text-static-black"}`}>{data.username}</p>
      <div className="flex-1" />
      <Dropdown selected={status} onSelect={setStatus} options={options} />
    </div>
  );
};

export default AttendanceItem;