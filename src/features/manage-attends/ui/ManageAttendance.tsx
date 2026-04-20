"use client";

import { Suspense, useCallback } from "react";
import AttendanceItem from "./AttendanceItem";
import { CloseIcon } from "@/shared/icons/CloseIcon";
import { useGetAttendancesByRoomId } from "@/entities/attendances/queries";
import { Button } from "@bds-web/ui";
import { useApprove } from "@/features/manage-approvals/hooks/useApprove";
import { Room } from "@/entities/rooms/types";
import { useSwipeToClose } from "@/shared/hooks/useSwipeToClose";
import { toast } from "@cher1shrxd/toast";
import { TOAST_ISSUE_DURATION } from "@/shared/constants/toast";
import PullToRefresh from "@/shared/ui/PullToRefresh";
import Refresh from "@/features/manage-attends/ui/Refresh";

interface Props {
  room: Room;
}

const ManageAttendance = ({ room }: Props) => {
  const attendances = useGetAttendancesByRoomId(room?.id || 0).data.data;
  const { isApproved, toggleApproval } = useApprove(room?.id || 0);
  const handleClose = useCallback(() => {
    if (!isApproved) {
      toast.warning(
        "승인 부탁드립니다",
        "출석 확인 후 승인해 주세요.",
        TOAST_ISSUE_DURATION,
      );
    }
  }, [isApproved]);

  const { handlers, triggerClose, animationClass } =
    useSwipeToClose(handleClose);

  return (
    <div
      className={`w-screen max-w-xl h-screen fixed top-0 right-0 bg-static-white z-10 border-greyscale-10 xl:border-l xl:rounded-l-large flex flex-col items-start gap-4 p-4 ${animationClass}`}
      {...handlers}
    >
      <div className="w-full flex justify-between items-center">
        <button
          onClick={triggerClose}
          className="bg-static-white shadow-modal rounded-full p-4 cursor-pointer"
        >
          <CloseIcon />
        </button>
        <h1 className="text-h3">
          {room?.grade && room?.classNumber
            ? `${room.grade}-${room.classNumber} (${room?.name})`
            : room?.name}
        </h1>
      </div>
      <div className="w-full flex flex-col min-[453px]:flex-row justify-between items-end min-[453px]:items-center gap-2">
        <p className="text-blue-light text-accent">
          {`인원 ${attendances.filter((a) => a.statuses[0].status).length}/${attendances.length}명`}
          {" · "}
          {`외박 ${attendances.filter((a) => a.statuses[0].status?.name === "외박").length}명`}
          {" · "}
          {`외출 ${attendances.filter((a) => a.statuses[0].status?.name === "외출").length}명`}
        </p>
        <div className="flex items-center gap-2">
          <Refresh />
          <div className="flex items-center gap-2 text-green-light">
            {isApproved ? (
              <>
                <p className="text-accent">승인됨</p>
                <div className="text-red-light">
                  <CloseIcon onClose={toggleApproval} />
                </div>
              </>
            ) : (
              <Button
                buttonSize="small"
                buttonType="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleApproval();
                }}
              >
                승인하기
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="w-full flex-1 rounded-medium shadow-modal overflow-scroll pb-20">
        <Suspense
          fallback={
            <div className="w-full h-20 flex items-center justify-center text-greyscale-40">
              로딩중...
            </div>
          }
        >
          <PullToRefresh>
            {!!room &&
              attendances.map((attendance) => (
                <AttendanceItem
                  data={attendance}
                  key={attendance.userId}
                  roomId={room.id}
                />
              ))}
          </PullToRefresh>
        </Suspense>
      </div>
    </div>
  );
};

export default ManageAttendance;
