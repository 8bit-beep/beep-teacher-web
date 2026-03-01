"use client";

import { Attendance } from "@/entities/attendances/types";
import ClassroomDropdown from "./ClassroomDropdown";

interface Props {
  data: Attendance;
  index: number;
}

const ClassroomItem = ({ data, index }: Props) => {
  return (
    <div
      className={`w-full h-14 flex items-center px-5 py-3 gap-4 ${index % 2 === 0 ? "bg-[#EFF8FF]" : "bg-white"}`}>
      <p className="text-body text-greyscale-40">{data.studentId}</p>
      <p className="text-accent text-static-black">{data.username}</p>
      <div className="flex-1" />
      {data.statuses.map((statusItem, statusIndex) => (
        <ClassroomDropdown
          key={statusItem.checkpoint.id}
          data={data}
          statusIndex={statusIndex}
        />
      ))}
    </div>
  );
};

export default ClassroomItem;
