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

  return (
    <div
      className="w-full flex flex-col items-center border-b border-greyscale-20 cursor-pointer text-h4 px-3 py-[15px] gap-[10px]"
      onClick={toggleOpen}
    >
      <div className="w-full">
        <div className="w-full flex items-center gap-2">
          <p className="w-full text-body">{label}</p>
          <div style={{ width: "140px" }}>
            <p className="text-greyscale-70">{approvedAt}</p>
          </div>
          <div style={{ width: "144px" }}>
            <p className="text-greyscale-70">{approvedTeacher}</p>
          </div>
          <ChevronIcon size={16} className="text-static-black" rotate={-90} />
        </div>
        <p className="w-full text-caption1 text-blue-light">{stats}</p>
      </div>
      <div className="w-full flex items-center">
            {isApproved ? (
              <>
                <p className="text-accent">승인됨</p>
                <div
                  className="text-red-light"
                  onClick={(e) => e.stopPropagation()}>
                  <CloseIcon onClose={toggleApproval} />
                </div>
              </>
            ) : (
              <ApprovalButton
                onClick={(e) => {
                  e.stopPropagation();
                  toggleApproval();
                }}
              />
            )}
      </div>
    </div>
  );
};

export default MobileRoomItem;