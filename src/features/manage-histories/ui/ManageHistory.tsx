"use client";

import { useGetHistories } from "@/entities/histories/queries";
import { Room } from "@/entities/rooms/types";
import { useRoomStore } from "../stores/room";
import { CloseIcon } from "@/shared/icons/CloseIcon";
import { Suspense } from "react";
import HistoryItem from "./HistoryItem";
import { useCheckpointStore } from "@/features/filter/stores/checkpoint";
import { useDateStore } from "@/features/filter/stores/date";
import { useSwipeToClose } from "@/shared/hooks/useSwipeToClose";

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
  const { setRoom } = useRoomStore();
  const { handlers, triggerClose, animationClass } = useSwipeToClose(
    () => setRoom(null),
  );

  return (
    <div
      className={`w-screen max-w-xl h-screen fixed top-0 right-0 bg-static-white z-10 border-greyscale-10 xl:border-l xl:rounded-l-large flex flex-col items-start gap-4 p-4 ${animationClass}`}
      {...handlers}>
      <div className="w-full flex justify-between items-center">
        <button
          onClick={triggerClose}
          className="bg-static-white shadow-modal rounded-full p-4 cursor-pointer">
          <CloseIcon />
        </button>
        <h1 className="text-h3">{room?.name}</h1>
      </div>
      <div className="w-full flex justify-between items-center">
        <p className="text-greyscale-40 text-caption2 xl:text-caption1">
          {`인원 ${histories.filter((a) => a.statuses[0].status).length}/${histories.length}명`}
          {" · "}
          {`외박 ${histories.filter((a) => a.statuses[0].status?.name === "외박").length}명`}
          {" · "}
          {`외출 ${histories.filter((a) => a.statuses[0].status?.name === "외출").length}명`}
        </p>
      </div>
      <div className="w-full flex-1 rounded-medium shadow-modal overflow-scroll">
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
    </div>
  );
};

export default ManageHistory;
