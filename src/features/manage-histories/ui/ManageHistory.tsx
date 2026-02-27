"use client";

import { useGetHistories } from "@/entities/histories/queries";
import { Room } from "@/entities/rooms/types";
import { useRoomStore } from "../stores/room";
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
    <div className="w-full bg-static-white xl:rounded-l-large flex flex-col items-start">
        <Suspense
          fallback={
            <div className="w-full h-20 flex items-center justify-center text-greyscale-40">
              로딩중...
            </div>
          }>
          {!!room &&
            histories.map((history) => (
              <HistoryItem
                data={history}
                key={history.userId}
                roomId={room.id}
              />
            ))}
        </Suspense>
    </div>
  );
};

export default ManageHistory;
