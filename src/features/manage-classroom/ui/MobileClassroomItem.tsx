import { Attendance } from "@/entities/attendances/types";
import ClassroomDropdown from "./ClassroomDropdown";

interface Props {
  data: Attendance;
}

const MobileClassroomItem = ({ data }: Props): React.ReactNode[] => [
  <div className="flex flex-col gap-1 py-2">
    <div className="flex justify-start gap-2">
      <p className="text-accent text-greyscale-40">{data.studentId}</p>
      <p className="text-accent text-static-black">{data.username}</p>
    </div>
    <div className="flex flex-row gap-2">
      {data.statuses.map((statusItem, statusIndex) => (
        <div key={statusItem.checkpoint.id} className="flex-1">
          <ClassroomDropdown data={data} statusIndex={statusIndex} />
        </div>
      ))}
    </div>
  </div>,
];

export default MobileClassroomItem;