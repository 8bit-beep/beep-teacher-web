"use client";

import { Shift } from "@/entities/shifts/types";
import { Button } from "@bds-web/ui";
import { useManageStatus } from "../hooks/useManageStatus";
import { CloseIcon } from "@/shared/icons/CloseIcon";

interface Props {
  data: Shift;
}

const ManageStatus = ({ data }: Props) => {
  const { updateStatus } = useManageStatus(data.id);

  return (
    <div className="flex items-center gap-2 justify-start">
      {data.status === "WAITING" ? (
        <>
          <Button
            buttonSize="small"
            buttonType="secondary"
            onClick={() => updateStatus("APPROVED")}>
            승인
          </Button>
          <Button
            buttonSize="small"
            buttonType="danger"
            onClick={() => updateStatus("REJECTED")}>
            거절
          </Button>
        </>
      ) : (
        <div
          className={`${data.status === "APPROVED" ? "text-green-light" : "text-red-light"} flex items-center justify-start gap-2`}>
          <p className="text-accent">
            {data.status === "APPROVED" ? "승인됨" : "거절됨"}
          </p>
          <CloseIcon onClose={() => updateStatus("WAITING")} />
        </div>
      )}
    </div>
  );
};

export default ManageStatus;
