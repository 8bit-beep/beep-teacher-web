"use client";

import { Shift } from "@/entities/shifts/types";
import { Button } from "@bds-web/ui";

interface Props {
  data: Shift;
}

const ManageStatus = ({ data }: Props) => {
  return (
    <div className="flex items-center gap-2 justify-center">
      {data.status === "WAITING" ? (
        <>
          <Button buttonSize="small" buttonType="secondary">
            승인
          </Button>
          <Button buttonSize="small" buttonType="danger">
            거절
          </Button>
        </>
      ) : (
        <p
          className={`text-accent ${data.status === "APPROVED" ? "text-green-light" : "text-red-light"}`}>
          {data.status === "APPROVED" ? "승인됨" : "거절됨"}
        </p>
      )}
    </div>
  );
};

export default ManageStatus;
