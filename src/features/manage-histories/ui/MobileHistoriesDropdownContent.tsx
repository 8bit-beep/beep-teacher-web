"use client";

import { Attendance } from "@/entities/attendances/types";
import { useGetAllCheckpointHistories } from "@/entities/histories/queries";
import { Room } from "@/entities/rooms/types";
import { useDateStore } from "@/features/filter/stores/date";
import ManageHistoryDropdown from "./ManageHistoryDropdown";

interface Props {
  room: Room;
}

interface MobileHistoriesDropdownContentItemProps {
  data: Attendance;
  roomId: number;
}

const MobileHistoriesDropdownContentHeader = ({ checkpointNames }: { checkpointNames: string[] }) => {
  return (
    <div className="w-full flex p-2.5 pr-5 gap-4">
      <div className="flex-1" />
      {checkpointNames.map((label) => (
        <p key={label} className="w-full text-static-black text-caption1 text-center">
          {label}
        </p>
      ))}
    </div>
  );
};

const MobileHistoriesDropdownContentItem = ({
  data,
  roomId,
}: MobileHistoriesDropdownContentItemProps) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex flex-row gap-2">
        <p className="text-accent text-greyscale-40">{data.studentId}</p>
        <p className="text-accent text-static-black">{data.username}</p>
      </div>
      <div className="w-full flex flex-row gap-2">
        {data.statuses.map((statusItem, statusIndex) => (
          <div key={statusItem.checkpoint.id} className="flex-1">
            <ManageHistoryDropdown
              data={data}
              roomId={roomId}
              index={statusIndex}
            />
          </div>        
        ))}
      </div>
    </div>
  );
};

const MobileHistoriesDropdownContent = ({ room }: Props) => {
  const { date } = useDateStore();
  const histories = useGetAllCheckpointHistories(room.id, date).data.data;

  const checkpointNames = histories[0]?.statuses.map((s) => s.checkpoint.name) ?? [];

  return (
    <div className="w-full bg-static-white xl:rounded-l-large flex flex-col items-start slide-in-down">
      <MobileHistoriesDropdownContentHeader checkpointNames={checkpointNames} />
      <div className="w-full">
        {histories.map((history, index) => (
          <div
            key={history.userId}
            className={`w-full py-2 flex items-center px-5 py-3 gap-4 ${index % 2 === 0 ? "bg-[#EFF8FF]" : "bg-white"}`}
          >
            <MobileHistoriesDropdownContentItem data={history} roomId={room.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileHistoriesDropdownContent;
