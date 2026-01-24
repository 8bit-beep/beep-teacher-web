"use client";

import { Room } from "@/entities/rooms/types";
import ChevronIcon from "@/shared/icons/ChevronIcon";
import { Button } from "@bds-web/ui";
import { Suspense } from "react";
import AttendanceItem from "./AttendanceItem";
import { useToggleData } from "../hooks/useToggleData";
import { useApprove } from "../../manageApprovals/hooks/useApprove";

interface Props {
  data: Room;
}

const RoomItem = ({ data }: Props) => {
  const { attendances, isOpen, toggleOpen } = useToggleData(data);
  const { isApproved, toggleApproval } = useApprove(data.id);

  return (
    <div className="w-full">
      <div
        className="w-full h-13.5 px-2 flex items-center justify-between border-b border-greyscale-20"
        onClick={toggleOpen}>
        <div className="flex flex-col xl:flex-row xl:gap-4">
          <p className="text-static-black text-accent">
            {data.grade
              ? `${data.grade}-${data.classNumber} (${data.name})`
              : data.name}
          </p>
          <p className="text-greyscale-40 text-caption2 xl:text-caption1">
            {`인원 ${attendances.filter((a) => a.statuses[0].status).length}/${attendances.length}명`}
            {" · "}
            {`외박 ${attendances.filter((a) => a.statuses[0].status?.name === "외박").length}명`}
            {" · "}
            {`외출 ${attendances.filter((a) => a.statuses[0].status?.name === "외출").length}명`}
          </p>
        </div>

        <div className="flex items-center gap-2 xl:gap-4">
          <Button
            buttonSize="small"
            buttonType={isApproved ? "danger" : "primary"}
            onClick={(e) => {
              e.stopPropagation();
              toggleApproval();
            }}>
            {isApproved ? "승인 취소" : "승인하기"}
          </Button>
          <ChevronIcon
            size={16}
            className="text-static-black"
            rotate={isOpen ? 180 : 0}
          />
        </div>
      </div>
      {isOpen && (
        <Suspense
          fallback={
            <div className="w-full h-20 flex items-center justify-center text-greyscale-40">
              로딩중...
            </div>
          }>
          {attendances.map((attendance) => (
            <AttendanceItem
              data={attendance}
              key={attendance.userId}
              roomId={data.id}
            />
          ))}
        </Suspense>
      )}
    </div>
  );
};

export default RoomItem;
