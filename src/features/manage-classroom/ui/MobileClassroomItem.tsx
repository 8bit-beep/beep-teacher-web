import { Attendance } from "@/entities/attendances/types";
import { DropdownOpenDirection } from "@beep-ds/ui";
import ClassroomDropdown from "./ClassroomDropdown";

interface Props {
  data: Attendance;
  openDirection?: DropdownOpenDirection;
}

const MobileClassroomItem = ({ data, openDirection }: Props): React.ReactNode[] =>
  data.statuses.map((statusItem, statusIndex) => (
    <div key={statusItem.checkpoint.id} className="py-2 px-1">
      <ClassroomDropdown
        data={data}
        statusIndex={statusIndex}
        openDirection={openDirection}
      />
    </div>
  ));

export default MobileClassroomItem;
