"use client";

import { Attendance } from "@/entities/attendances/types";
import {
  isAbsenceStatusName,
  isOutStatusName,
} from "@/shared/utils/attendance-status";
import { Dropdown } from "@bds-web/ui";
import { useUpdateAttendance } from "../hooks/useUpdateAttendance";

interface Props {
  data: Attendance;
  roomId: number;
}

const AttendanceItem = ({ data, roomId }: Props) => {
  const { status, setStatus, options } = useUpdateAttendance(data, roomId);
  const currentStatus = data.statuses[0].status?.name;
  const isAbsent = isAbsenceStatusName(currentStatus);
  const isOut = isOutStatusName(currentStatus);

  return (
    <div
      className={`w-full h-15 flex items-center px-4 gap-4 ${currentStatus ? (isAbsent ? "bg-red-light" : isOut ? "bg-green-light" : "bg-static-white") : "bg-greyscale-10"}`}>
      <div
        className={`w-4.5 h-4.5 rounded-full shrink-0 ${data.isLate ? "bg-yellow-400" : "bg-transparent"}`}
      />
      <p
        className={`text-body inline-block w-9 ${isAbsent || isOut ? "text-greyscale-10" : "text-greyscale-40"}`}>
        {data.studentId}
      </p>
      <p
        className={`text-h4 inline-block min-w-12 ${isAbsent || isOut ? "text-white" : "text-static-black"}`}>
        {data.name}
      </p>
      <div className="flex-1" />
      <Dropdown selected={status} onSelect={setStatus} options={options} width={"120px"}/>
    </div>
  );
};

export default AttendanceItem;
