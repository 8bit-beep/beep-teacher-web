"use client";

import { Attendance } from "@/entities/attendances/types";
import { useGetAllCheckpointHistories } from "@/entities/histories/queries";
import { Room } from "@/entities/rooms/types";
import { useDateStore } from "@/features/filter/stores/date";
import ManageHistoryDropdown from "./ManageHistoryDropdown";

interface Props {
  room: Room;
}

interface HistoriesDropdownContentItemProps {
  data: Attendance;
  roomId: number;
  dropdownWidth: string;
}

const HistoriesDropdownContentHeader = ({ checkpointNames, headerWidthClass }: { checkpointNames: string[], headerWidthClass: string }) => {
  return (
    <div className="w-full flex p-2.5 pr-5 gap-4">
      <p className="w-45 text-static-black text-body text-center">학번/이름</p>
      <div className="flex-1" />
      {checkpointNames.map((label) => (
        <p key={label} className={`${headerWidthClass} text-static-black text-body text-center`}>
          {label}
        </p>
      ))}
    </div>
  );
};

const HistoriesDropdownContentItem = ({
  data,
  roomId,
  dropdownWidth,
}: HistoriesDropdownContentItemProps) => {
  return (
    <>
      <p className="text-body text-greyscale-40">{data.studentId}</p>
      <p className="text-accent text-static-black">{data.name}</p>
      <div className="flex-1" />
      {data.statuses.map((statusItem, statusIndex) => (
        <ManageHistoryDropdown
          key={statusItem.checkpoint.id}
          data={data}
          roomId={roomId}
          index={statusIndex}
          desktopWidth={dropdownWidth}
        />
      ))}
    </>
  );
};

const HistoriesDropdownContent = ({ room }: Props) => {
  const { date } = useDateStore();
  const histories = useGetAllCheckpointHistories(room.id, date).data.data;

  const checkpointNames = histories[0]?.statuses.map((s) => s.checkpoint.name) ?? [];
  const checkpoint = checkpointNames.length >= 4;
  const dropdownWidth = checkpoint ? "150px" : "180px";
  const headerWidthClass = checkpoint ? "w-[150px]" : "w-[180px]";

  return (
    <div className="w-full bg-static-white xl:rounded-l-large flex flex-col items-start slide-in-down">
      <HistoriesDropdownContentHeader checkpointNames={checkpointNames} headerWidthClass={headerWidthClass} />
      <div className="w-full">
        {histories.map((history, index) => (
          <div
            key={history.userId}
            className={`w-full h-14 flex items-center px-5 py-3 gap-4 ${index % 2 === 0 ? "bg-[#EFF8FF]" : "bg-white"}`}
          >
            <HistoriesDropdownContentItem data={history} roomId={room.id} dropdownWidth={dropdownWidth} />
          </div>
        ))}
      </div>

    </div>
  );
};

export default HistoriesDropdownContent;
