"use client";

import { Room } from "@/entities/rooms/types";
import { useToggleData } from "../hooks/useToggleData";
import ChevronIcon from "@/shared/icons/ChevronIcon";
import ManageHistory from "./ManageHistory";

interface Props {
  data: Room;
}

const HistoryRoomItem = ({ data }: Props) => {
  const { histories, toggle, room } = useToggleData(data);
  const isOpen = room?.id === data.id;

  return (
    <div className="w-full">
      <div
        className="w-full h-13.5 px-2 flex items-center justify-between border-b border-greyscale-20"
        onClick={toggle}>
        <div className="flex flex-col xl:flex-row xl:gap-[5px] items-center">
          <p className="text-static-black text-accent">
            {data.grade
              ? `${data.grade}-${data.classNumber} (${data.name})`
              : data.name}
          </p>
          <p className="xl:block hidden text-static-black text-accent">{"·"}</p>
          <p className="text-blue-light text-body">
            {`인원 ${histories.filter((a) => a.statuses[0].status).length}/${histories.length}명`}
            {" · "}
            {`외박 ${histories.filter((a) => a.statuses[0].status?.name === "외박").length}명`}
            {" · "}
            {`외출 ${histories.filter((a) => a.statuses[0].status?.name === "외출").length}명`}
          </p>
        </div>

        <div className="flex items-center gap-2 xl:gap-4">
          <ChevronIcon
            size={16}
            className="text-static-black"
            rotate={isOpen ? 0 : -180}
          />
        </div>
      </div>
      {isOpen && <ManageHistory room={data} />}
    </div>
  );
};

export default HistoryRoomItem;
