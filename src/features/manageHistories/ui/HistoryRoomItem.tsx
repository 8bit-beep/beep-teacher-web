"use client";

import { Room } from "@/entities/rooms/types";
import { useToggleData } from "../hooks/useToggleData";
import ChevronIcon from "@/shared/icons/ChevronIcon";
import { Suspense } from "react";
import HistoryItem from "./HistoryItem";

interface Props {
  data: Room;
}

const HistoryRoomItem = ({ data }: Props) => {
  const { histories, isOpen, toggleOpen } = useToggleData(data);

  return (
    <div className="w-full">
      <div
        className="w-full h-13.5 px-2 flex items-center gap-4 border-b border-greyscale-20"
        onClick={toggleOpen}>
        <p className="text-static-black text-accent">
          {data.grade
            ? `${data.grade}-${data.classNumber} (${data.name})`
            : data.name}
        </p>
        <p className="text-greyscale-40 text-caption1">
          {`인원 ${histories.filter((a) => a.statuses[0].status).length}/${histories.length}명`}
          {" · "}
          {`외박 ${histories.filter((a) => a.statuses[0].status?.name === "외박").length}명`}
          {" · "}
          {`외출 ${histories.filter((a) => a.statuses[0].status?.name === "외출").length}명`}
        </p>
        <div className="flex-1" />
        <ChevronIcon
          size={16}
          className="text-static-black"
          rotate={isOpen ? 180 : 0}
        />
      </div>
      {isOpen && (
        <Suspense
          fallback={
            <div className="w-full h-20 flex items-center justify-center text-greyscale-40">
              로딩중...
            </div>
          }>
          {histories.map((history) => (
            <HistoryItem
              data={history}
              roomId={data.id}
              key={history.studentId}
            />
          ))}
        </Suspense>
      )}
    </div>
  );
};

export default HistoryRoomItem;
