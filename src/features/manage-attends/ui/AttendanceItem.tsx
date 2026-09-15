"use client";

import { Attendance } from "@/entities/attendances/types";
import {
  isAbsenceStatusName,
  isOutStatusName,
} from "@/shared/utils/attendance-status";
import { Checkbox, Dropdown } from "@beep-ds/ui";
import { useUpdateAttendance } from "../hooks/useUpdateAttendance";

interface Props {
  data: Attendance;
  roomId: number;
  selected: boolean;
  onToggleSelect: () => void;
}

const AttendanceItem = ({ data, roomId, selected, onToggleSelect }: Props) => {
  const { status, statusName, setStatus, options } = useUpdateAttendance(
    data,
    roomId,
  );
  const currentStatus = statusName;
  const isAbsent = isAbsenceStatusName(currentStatus);
  const isOut = isOutStatusName(currentStatus);

  return (
    <div
      className={`w-full h-15 flex items-center px-4 gap-2.5 min-[453px]:gap-4 border-b border-greyscale-20 min-[453px]:border-b-0 ${currentStatus ? (isAbsent ? "bg-red-light" : isOut ? "bg-green-light" : "bg-static-white") : "bg-greyscale-10"}`}>
      <Checkbox checked={selected} onChange={onToggleSelect} />
      <div
        className={`w-4.5 h-4.5 rounded-full shrink-0 ${data.isLate ? "bg-yellow-400" : "bg-transparent"}`}
      />
      <p
        className={`text-caption1 min-[453px]:text-body inline-block w-9 ${isAbsent || isOut ? "text-greyscale-10" : "text-greyscale-40"}`}>
        {data.studentId}
      </p>
      <p
        className={`text-body min-[453px]:text-h4 ${isAbsent || isOut ? "text-white" : "text-static-black"}`}>
        {data.name}
      </p>
      <div className="flex-1" />
      <Dropdown selected={status} onSelect={setStatus} options={options} width={"120px"}/>
    </div>
  );
};

export default AttendanceItem;
