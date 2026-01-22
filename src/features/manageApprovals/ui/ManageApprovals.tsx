"use client";

import { Approval } from "@/entities/approvals/types";
import { Button } from "@bds-web/ui";
import { useApprove } from "../hooks/useApprove";
import { CloseIcon } from "@/shared/icons/CloseIcon";

interface Props {
  data: Approval;
}

const ManageApprovals = ({ data }: Props) => {
  const { toggleApproval, isApproved } = useApprove(data.room.id);

  return isApproved ? (
    <div className="text-green-light">
      <p className="text-accent">승인됨</p>
      <CloseIcon onClose={toggleApproval} />
    </div>
    
  ) : (
    <Button buttonSize="small" buttonType="secondary" onClick={toggleApproval}>승인하기</Button>
  )
}

export default ManageApprovals