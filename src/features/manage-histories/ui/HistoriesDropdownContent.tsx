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
}

const HistoriesDropdownContentHeader = () => {
  return (
    <div className="w-full flex p-2.5 pr-5 gap-4">
      <p className="w-45 text-static-black text-body text-center">학생/이름</p>
      <div className="flex-1" />
      {["8~9교시", "10~11교시", "최종"].map((label) => (
        <p key={label} className="w-45 text-static-black text-body text-center">
          {label}
        </p>
      ))}
    </div>
  );
};

const HistoriesDropdownContentItem = ({
  data,
  roomId,
}: HistoriesDropdownContentItemProps) => {
  return (
    <>
      <p className="text-body text-greyscale-40">{data.studentId}</p>
      <p className="text-accent text-static-black">{data.username}</p>
      <div className="flex-1" />
      {data.statuses.map((statusItem, statusIndex) => (
        <ManageHistoryDropdown
          key={statusItem.checkpoint.id}
          data={data}
          roomId={roomId}
          index={statusIndex}
        />
      ))}
    </>
  );
};

const HistoriesDropdownContent = ({ room }: Props) => {
  const { date } = useDateStore();
  const histories = useGetAllCheckpointHistories(room.id, date).data.data;

  return (
    <div className="w-full bg-static-white xl:rounded-l-large flex flex-col items-start slide-in-down">
      <HistoriesDropdownContentHeader />
      <div className="w-full">
        {histories.map((history, index) => (
          <div
            key={history.userId}
            className={`w-full h-14 flex items-center px-5 py-3 gap-4 ${index % 2 === 0 ? "bg-[#EFF8FF]" : "bg-white"}`}
          >
            <HistoriesDropdownContentItem data={history} roomId={room.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoriesDropdownContent;
