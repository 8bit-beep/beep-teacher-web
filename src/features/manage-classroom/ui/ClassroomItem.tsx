import { Attendance } from "@/entities/attendances/types";
import { DropdownOpenDirection } from "@beep-ds/ui";
import ClassroomDropdown from "./ClassroomDropdown";

interface Props {
  data: Attendance;
  isHighlighted?: boolean;
  desktopWidth?: string;
  openDirection?: DropdownOpenDirection;
}

const ClassroomItem = ({ data, isHighlighted, desktopWidth, openDirection }: Props): React.ReactNode[] => [
  <div key="student" className="flex gap-4">
    <p className={`text-body ${isHighlighted ? "text-greyscale-10" : "text-greyscale-40"}`}>
      {data.studentId}
    </p>
    <p className={`text-accent ${isHighlighted ? "text-white" : "text-static-black"}`}>
      {data.name}
    </p>
  </div>,
  ...data.statuses.map((statusItem, statusIndex) => (
    <div key={statusItem.checkpoint.id} className="pl-4">
      <ClassroomDropdown
        data={data}
        statusIndex={statusIndex}
        desktopWidth={desktopWidth}
        openDirection={openDirection}
      />
    </div>
  )),
];

export default ClassroomItem;
