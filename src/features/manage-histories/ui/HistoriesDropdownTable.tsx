"use client";

import { useGetAllCheckpointHistories } from "@/entities/histories/queries";
import { Room } from "@/entities/rooms/types";
import { useDateStore } from "@/features/filter/stores/date";
import ChevronIcon from "@/shared/icons/ChevronIcon";
import { DropdownTableItemRenderProps } from "@/widgets/dropdown-table/ui/DropdownTable";
import DropdownTable from "@/widgets/dropdown-table/ui/DropdownTable";
import HistoriesDropdownContent from "./HistoriesDropdownContent";
import MobileHistoriesDropdownContent from "./MobileHistoriesDropdownContent";

interface Props {
  data: Room[];
}

interface HistoriesDropdownTriggerProps extends DropdownTableItemRenderProps {
  room: Room;
}

const HistoriesDropdownTrigger = ({
  room,
  isOpen,
  toggle,
}: HistoriesDropdownTriggerProps) => {
  const { date } = useDateStore();
  const histories = useGetAllCheckpointHistories(room.id, date).data.data;

  return (
    <div
      className="w-full h-13.5 px-2 flex items-center justify-between border-b border-greyscale-20"
      onClick={toggle}>
      <div className="flex flex-col xl:flex-row xl:gap-1.25 items-center">
        <p className="w-full xl:w-fit text-static-black text-accent">
          {room.grade
            ? `${room.grade}-${room.classNumber} (${room.name})`
            : room.name}
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
  );
};

const HistoriesDropdownTable = ({ data }: Props) => {
  return (
    <DropdownTable
      data={data}
      getKey={(room) => room.id}
      emptyContent={
        <div className="w-full flex items-center justify-center py-20 text-greyscale-50">
          출석 정보가 없습니다.
        </div>
      }
      renderTrigger={(room, _index, { isOpen, toggle }) => (
        <>
          <HistoriesDropdownTrigger room={room} isOpen={isOpen} toggle={toggle} />
        </>
      )}
      renderContent={(room) => 
      <>
        <div className="hidden lg:block"><HistoriesDropdownContent room={room} /></div>
        <div className="lg:hidden"><MobileHistoriesDropdownContent room={room} /></div>
      </>
    }
    />
  );
};

export default HistoriesDropdownTable;
