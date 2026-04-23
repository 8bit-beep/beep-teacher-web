"use client";

import { Shift } from "@/entities/shifts/types";
import { pad } from "@/shared/utils/pad";
import { Button } from "@bds-web/ui";
import { useManageStatus } from "../hooks/useManageStatus";

interface Props {
  data: Shift;
}

const DetailModal = ({ data }: Props) => {
  const { updateStatus } = useManageStatus(data.id);

  return (
    <div className="w-full flex flex-col gap-5 max-w-lg">
      <div className="w-full flex flex-col gap-1">
        <span className="text-caption1">학번 이름</span>
        <p className="text-body">{`${data.user.studentInfo?.grade || 0}${data.user.studentInfo?.classNumber || 0}${pad(data.user.studentInfo?.num || 0, 2)} ${data.user.name}`}</p>
      </div>
      <div className="w-full flex flex-col gap-1">
        <span className="text-caption1">신청 사유</span>
        <div className="w-full min-h-24 text-body whitespace-pre-wrap wrap-break-word shadow-modal">
          {data.reason}
        </div>
      </div>
      <div className="w-full flex gap-1">
        <div className="w-full flex flex-col items-start gap-1 p-1">
          <span className="text-caption1">실 이동 시간</span>
          <p className="w-full text-body break-keep shadow-modal bg-static-white rounded-medium px-5 py-2">
            {data.checkpoint.name}
          </p>
        </div>
        <div className="w-full flex flex-col items-start gap-1 p-1">
          <span className="text-caption1">요청 내용</span>
          <div className="flex items-center gap-2">
            <p className="w-full text-body break-keep shadow-modal bg-static-white rounded-medium px-5 py-2">
              {data.room.name}
            </p>
          </div>
        </div>
      </div>
      {data.status === "WAITING" ? (
        <div className="w-full flex items-center gap-2">
          <Button
            buttonSize="large"
            buttonType="secondary"
            style={{ flex: 1 }}
            onClick={() => updateStatus("APPROVED")}>
            승인
          </Button>
          <Button
            buttonSize="large"
            buttonType="danger"
            style={{ flex: 1 }}
            onClick={() => updateStatus("REJECTED")}>
            거절
          </Button>
        </div>
      ) : (
        <Button
          buttonSize="large"
          buttonType="primary"
          style={{ width: "100%" }}
          onClick={() => updateStatus("WAITING")}>
          보류로 전환
        </Button>
      )}
    </div>
  );
};

export default DetailModal;
