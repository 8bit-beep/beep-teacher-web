import { Attendance } from "@/entities/attendances/types";
import ClassroomDropdown from "./ClassroomDropdown";

interface Props {
  data: Attendance;
}

const MobileClassroomItem = ({ data }: Props): React.ReactNode[] => [
  <div className="flex gap-4">
    <p className="text-body text-greyscale-40">{data.studentId}</p>
    <p className="text-accent text-static-black">{data.username}</p>
  </div>,
  ...data.statuses.map((statusItem, statusIndex) => (
    <div key={statusItem.checkpoint.id} className="pl-4">
      <ClassroomDropdown data={data} statusIndex={statusIndex} />
    </div>
  )),
];

export default MobileClassroomItem;