"use client";

import { Student } from "@/entities/students/types";
import { pad } from "@/shared/utils/pad";
import { Checkbox } from "@bds-web/ui";

interface Props {
  data: Student;
  selectedStudents: number[];
  toggleSelected: (studentId: number) => void;
}

const StudentItem = ({ data, selectedStudents, toggleSelected }: Props) => {
  return (
    <div className="w-full pl-6 pr-5 py-2.5 border-b border-greyscale-20 flex items-center gap-2">
      <p className="text-caption1 text-greyscale-40">
        {data.studentInfo.grade}
        {data.studentInfo.classNumber}
        {pad(data.studentInfo.num, 2)}
      </p>
      <p className="text-body text-static-black">{data.name}</p>
      <div className="flex-1" />
      <Checkbox checked={selectedStudents.includes(data.id)} onChange={() => toggleSelected(data.id)} size={20} />
    </div>
  );
};

export default StudentItem;
