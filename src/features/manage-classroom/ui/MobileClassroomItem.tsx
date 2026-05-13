import { Attendance } from "@/entities/attendances/types";
import ClassroomDropdown from "./ClassroomDropdown";

interface Props {
  data: Attendance;
  isAbsent?: boolean;
}

const MobileClassroomItem = ({ data, isAbsent }: Props): React.ReactNode[] =>
  data.statuses.map((statusItem, statusIndex) => (
    <div key={statusItem.checkpoint.id} className="py-2 px-1">
      <ClassroomDropdown data={data} statusIndex={statusIndex} />
    </div>
  ));

export default MobileClassroomItem;
