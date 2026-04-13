import { Attendance } from "@/entities/attendances/types";
import ClassroomDropdown from "./ClassroomDropdown";

interface Props {
  data: Attendance;
  isAbsent?: boolean;
  desktopWidth?: string;
}

const ClassroomItem = ({ data, isAbsent, desktopWidth }: Props): React.ReactNode[] => [
  <div key="student" className="flex gap-4">
    <p className={`text-body ${isAbsent ? "text-greyscale-10" : "text-greyscale-40"}`}>
      {data.studentId}
    </p>
    <p className={`text-accent ${isAbsent ? "text-white" : "text-static-black"}`}>
      {data.name}
    </p>
  </div>,
  ...data.statuses.map((statusItem, statusIndex) => (
    <div key={statusItem.checkpoint.id} className="pl-4">
      <ClassroomDropdown data={data} statusIndex={statusIndex} desktopWidth={desktopWidth} />
    </div>
  )),
];

export default ClassroomItem;
