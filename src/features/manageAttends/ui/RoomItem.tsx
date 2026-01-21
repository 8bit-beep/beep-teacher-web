"use client";

import { DUMMY_ATTENDANCE } from "@/entities/attendances/constants/dummy";
import { Room } from "@/entities/rooms/types";
import ChevronIcon from "@/shared/icons/ChevronIcon";
import { Button } from "@bds-web/ui";
import { Suspense, useState } from "react";
import AttendanceItem from "./AttendanceItem";

interface Props {
  data: Room;
}

const RoomItem = ({ data }: Props) => {
  const attendances = [DUMMY_ATTENDANCE, DUMMY_ATTENDANCE, DUMMY_ATTENDANCE];
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-full">
      <div
        className="w-full h-13.5 px-2 flex items-center gap-4 border-b border-greyscale-20"
        onClick={toggleOpen}>
        <p className="text-static-black text-body">
          {data.grade
            ? `${data.grade}-${data.classNumber} (${data.name})`
            : data.name}
        </p>
        <p className="text-greyscale-40 text-caption1">
          총 {attendances.length}명
        </p>
        <div className="flex-1" />
        <Button buttonSize="small" buttonType="primary">
          전체 승인하기
        </Button>
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
          {attendances.map((attendance, index) => (
            <AttendanceItem data={attendance} key={index} />
          ))}
        </Suspense>
      )}
    </div>
  );
};

export default RoomItem;
