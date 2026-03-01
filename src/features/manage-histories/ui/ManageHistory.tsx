"use client";

import { useGetAllCheckpointHistories } from "@/entities/histories/queries";
import { Room } from "@/entities/rooms/types";
import { Suspense } from "react";
import { useDateStore } from "@/features/filter/stores/date";
import AttendanceStatusItem from "@/features/manage-histories/ui/ManageHistoryItem";

interface Props {
  room: Room;
}

const ManageHistory = ({ room }: Props) => {
  const { date } = useDateStore();
  const histories = useGetAllCheckpointHistories(room.id, date).data.data;

  return (
    <div className="w-full bg-static-white xl:rounded-l-large flex flex-col items-start slide-in-down">
      <div className="w-full flex p-[10px] pr-[20px] gap-4">
        <p className="w-[180px] text-static-black text-body text-center">학생/이름</p>
        <div className="flex-1"/>
        <p className="w-[180px] text-static-black text-body text-center">8~9교시</p>
        <p className="w-[180px] text-static-black text-body text-center">10~11교시</p>
        <p className="w-[180px] text-static-black text-body text-center">최종</p>
      </div>
        <Suspense
          fallback={
            <div className="w-full h-20 flex items-center justify-center text-greyscale-40">
              로딩중...
            </div>
          }
        >
          {!!room &&
            histories.map((history, index) => (
              <AttendanceStatusItem  
                data={history}
                key={history.userId}
                roomId={room.id}
                index={index}
              />
            ))
          }
        </Suspense>
    </div>
  );
};

export default ManageHistory;
