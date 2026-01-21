"use client";

import { Attendance } from "@/entities/attendances/types";
import { Dropdown } from "@bds-web/ui";
import { useUpdateAttendance } from "../hooks/useUpdateAttendance";

interface Props {
  data: Attendance;
}

const AttendanceItem = ({ data }: Props) => {
  const { status, setStatus, options } = useUpdateAttendance();

  return (
    <div
      className={`w-full h-14 flex items-center px-4 gap-4 ${data.statuses[0].status ? "bg-static-white" : "bg-greyscale-10"}`}>
      <p className="text-caption1 text-greyscale-40">{data.studentId}</p>
      <p className="text-body text-static-black">{data.username}</p>
      <div className="flex-1" />
      <Dropdown selected={status} onSelect={setStatus} options={options} />
    </div>
  );
};

export default AttendanceItem;
