"use client";

import { Approval } from "@/entities/approvals/types";
import { Button } from "@bds-web/ui";
import { useApprove } from "../hooks/useApprove";
import { CloseIcon } from "@/shared/icons/CloseIcon";
import { colors } from "@bds-web/colors";

interface Props {
  data: Approval;
}

const ManageApprovals = ({ data }: Props) => {
  const { toggleApproval, isApproved } = useApprove(data.room.id);

  return (
    <div
      className="flex items-center gap-2"
      style={{ color: colors.green.light }}>
      {isApproved ? (
        <>
          <p className="text-accent">승인됨</p>
          <div style={{ color: colors.red.light }}>
            <CloseIcon onClose={toggleApproval} />
          </div>
        </>
      ) : (
        <Button
          buttonSize="small"
          buttonType="primary"
          onClick={toggleApproval}>
          승인하기
        </Button>
      )}
    </div>
  );
};

export default ManageApprovals;
