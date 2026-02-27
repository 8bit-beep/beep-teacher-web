"use client";

import { Suspense } from "react";
import AttendanceItem from "./AttendanceItem";
import { CloseIcon } from "@/shared/icons/CloseIcon";
import { useGetAttendancesByRoomId } from "@/entities/attendances/queries";
import { Button } from "@bds-web/ui";
import { useApprove } from "@/features/manage-approvals/hooks/useApprove";
import { Room } from "@/entities/rooms/types";
import { useSwipeToClose } from "@/shared/hooks/useSwipeToClose";
interface Props {
  room: Room;
}

const ManageAttendance = ({ room }: Props) => {
  const attendances = useGetAttendancesByRoomId(room?.id || 0).data.data;
  const { isApproved, toggleApproval } = useApprove(room?.id || 0);
  const { handlers, triggerClose, animationClass } = useSwipeToClose();

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
          {`인원 ${attendances.filter((a) => a.statuses[0].status).length}/${attendances.length}명`}
          {" · "}
          {`외박 ${attendances.filter((a) => a.statuses[0].status?.name === "외박").length}명`}
          {" · "}
          {`외출 ${attendances.filter((a) => a.statuses[0].status?.name === "외출").length}명`}
        </p>
        <Button
          buttonSize="small"
          buttonType={isApproved ? "danger" : "primary"}
          onClick={(e) => {
            e.stopPropagation();
            toggleApproval();
          }}>
          {isApproved ? "승인 취소" : "승인하기"}
        </Button>
      </div>
      <div className="w-full flex-1 rounded-medium shadow-modal overflow-scroll">
        <Suspense
          fallback={
            <div className="w-full h-20 flex items-center justify-center text-greyscale-40">
              로딩중...
            </div>
          }>
          {!!room &&
            attendances.map((attendance) => (
              <AttendanceItem
                data={attendance}
                key={attendance.userId}
                roomId={room.id}
              />
            ))}
        </Suspense>
      </div>
    </div>
  );
};

export default ManageAttendance;
