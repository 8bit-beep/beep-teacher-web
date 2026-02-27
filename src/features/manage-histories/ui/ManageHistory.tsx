"use client";

import { useGetHistories } from "@/entities/histories/queries";
import { Room } from "@/entities/rooms/types";
import { Suspense } from "react";
import HistoryItem from "./HistoryItem";
import { useCheckpointStore } from "@/features/filter/stores/checkpoint";
import { useDateStore } from "@/features/filter/stores/date";

interface Props {
  room: Room;
}

const ManageHistory = ({ room }: Props) => {
  const { date } = useDateStore();
  const { checkpoint } = useCheckpointStore();
  const histories = useGetHistories(
    room?.id || 0,
    date,
    Number(checkpoint?.value || 1),
  ).data.data;

  return (
    <div className="w-full bg-static-white xl:rounded-l-large flex flex-col items-start slide-in-down">
      <div className="w-full flex p-[10px]">
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
          }>
          {!!room &&
            histories.map((history, index) => (
              <HistoryItem
                data={history}
                key={history.userId}
                roomId={room.id}
                index={index}
              />
            ))}
        </Suspense>
    </div>
  );
};

export default ManageHistory;
