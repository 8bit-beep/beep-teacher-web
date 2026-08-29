"use client";

import { useGetAttendTypesQuery } from "@/entities/attend-types/queries";
import { Student } from "@/entities/students/types";
import { pad } from "@/shared/utils/pad";
import {
  isAbsenceStatusName,
  isOutStatusName,
} from "@/shared/utils/attendance-status";
import { Checkbox } from "@beep-ds/ui";

interface Props {
  data: Student;
  selectedStudents: number[];
  toggleSelected: (studentId: number, student?: Student) => void;
}

const StudentItem = ({ data, selectedStudents, toggleSelected }: Props) => {
  const types = useGetAttendTypesQuery().data?.data;
  const statusName = data.typeId
    ? types?.find((type) => type.id === data.typeId)?.name
    : undefined;

  const statusColor = isAbsenceStatusName(statusName)
    ? "text-red-light"
    : isOutStatusName(statusName)
      ? "text-green-light"
      : "text-blue-light";

  return (
    <div className="w-full pl-6 pr-5 py-2.5 border-b border-greyscale-20 flex items-center gap-2">
      <p className="text-caption1 text-greyscale-40">
        {data.studentInfo.grade}
        {data.studentInfo.classNumber}
        {pad(data.studentInfo.num, 2)}
      </p>
      <p className="text-body text-static-black">{data.name}</p>
      <div className="flex-1" />
      {statusName ? (
        <span className={`text-caption1 ${statusColor}`}>{statusName}</span>
      ) : (
        <Checkbox
          checked={selectedStudents.includes(data.id)}
          onChange={() => toggleSelected(data.id, data)}
          size={20}
        />
      )}
    </div>
  );
};

export default StudentItem;
