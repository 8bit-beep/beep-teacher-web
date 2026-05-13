"use client";

import { Room } from "@/entities/rooms/types";
import { useToggleData } from "../hooks/useToggleData";
import { useApprove } from "../../manage-approvals/hooks/useApprove";
import ChevronIcon from "@/shared/icons/ChevronIcon";
import { CloseIcon } from "@/shared/icons/CloseIcon";
import ApprovalButton from "@/shared/ui/ApprovalButton";

interface Props {
  data: Room;
  approvedAt?: string;
  approvedTeacher?: string;
}

const MobileRoomItem = ({ data, approvedAt, approvedTeacher }: Props) => {
  const { attendances, toggleOpen } = useToggleData(data);
  const { isApproved, toggleApproval } = useApprove(data.id);

  const label = data.grade
    ? `${data.grade}-${data.classNumber} (${data.name})`
    : data.name;

  const stats = `인원 ${attendances.filter((a) => a.statuses[0].status).length}/${attendances.length}명 · 외박 ${attendances.filter((a) => a.statuses[0].status?.name === "외박").length}명 · 외출 ${attendances.filter((a) => a.statuses[0].status?.name === "외출").length}명`;
  
  const ApprovedInfo = ({ approvedAt, approvedTeacher }: { approvedAt: string; approvedTeacher: string }) => (
    <div className="flex w-full">
      <p className="text-caption1 inline-block w-full">{approvedAt}</p>
      <p className="text-caption1 inline-block w-full">{approvedTeacher}</p>
    </div>
  );
  
  const ApprovalStatus = ({ onRevoke }: { onRevoke: () => void }) => (
    <>
      <p className="text-accent">승인됨</p>
      <div className="text-red-light" onClick={(e) => e.stopPropagation()}>
        <CloseIcon onClose={onRevoke} />
      </div>
    </>
  );
  
  return (
    <div
      className="w-full flex flex-col items-center border-b active:bg-zinc-200 border-greyscale-20 cursor-pointer text-h4 px-3 py-[15px] gap-[10px]"
      onClick={toggleOpen}
    >
      <div className="w-full flex items-center gap-2">
        <p className="w-full text-body">{label}</p>
        <div className="flex w-full">
          {isApproved && approvedAt && approvedTeacher
            ? <ApprovedInfo approvedAt={approvedAt} approvedTeacher={approvedTeacher} />
            : <p className="text-caption1 w-full text-blue-light">{stats}</p>
          }
        </div>
        <ChevronIcon size={16} className="text-static-black" rotate={-90} />
      </div>
      <div className="w-full flex items-center">
        {isApproved && approvedAt && approvedTeacher
          ? <ApprovalStatus onRevoke={toggleApproval} />
          : (
            <ApprovalButton
              onClick={(e) => {
                e.stopPropagation();
                toggleApproval();
              }}
            />
          )
        }
      </div>
    </div>
  );
};

export default MobileRoomItem;