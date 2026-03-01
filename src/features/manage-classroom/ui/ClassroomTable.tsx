import { Attendance } from "@/entities/attendances/types";
import ClassroomItem from "./ClassroomItem";

interface Props {
  data: Attendance[];
}

const ClassroomTable = ({ data }: Props) => {
  const checkpointNames = data[0]?.statuses.map((s) => s.checkpoint.name) ?? [];

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex h-12 bg-[#3D6B9A] items-center px-5 gap-4">
        <p className="text-body text-static-white">학번/이름</p>
        <div className="flex-1" />
        {checkpointNames.map((name) => (
          <p key={name} className="w-[180px] text-body text-static-white text-center">
            {name}
          </p>
        ))}
      </div>
      {data.map((attendance, index) => (
        <ClassroomItem
          key={attendance.userId}
          data={attendance}
          index={index}
        />
      ))}
    </div>
  );
};

export default ClassroomTable;
