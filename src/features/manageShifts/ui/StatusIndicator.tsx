"use client";

import { Shift } from "@/entities/shifts/types";
import { modal } from "@bds-web/ui";
import DetailModal from "./DetailModal";

interface Props {
  data: Shift;
}

const StatusIndicator = ({ data }: Props) => {
  return (
    <button
      className={`${data.status === "APPROVED" ? "text-green-light" : data.status === "REJECTED" ? "text-red-light" : "text-blue-light"} text-caption1`}
      onClick={() =>
        modal.open({ title: "신청 내용", content: <DetailModal data={data} /> })
      }>
      {data.status === "APPROVED"
        ? "승인됨"
        : data.status === "REJECTED"
          ? "거절됨"
          : "보류중"}
      · 신청 보기
    </button>
  );
};

export default StatusIndicator;
