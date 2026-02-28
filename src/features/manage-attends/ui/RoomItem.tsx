"use client";

import { Room } from "@/entities/rooms/types";
import { Button } from "@bds-web/ui";
import { useToggleData } from "../hooks/useToggleData";
import { useApprove } from "../../manage-approvals/hooks/useApprove";
import ChevronIcon from "@/shared/icons/ChevronIcon";
import { CloseIcon } from "@/shared/icons/CloseIcon";
import { colors } from "@bds-web/colors";

interface Props {
  data: Room;
  approvedAt?: string;
  approvedTeacher?: string;
}

const RoomItem = ({ data, approvedAt, approvedTeacher }: Props) => {
  const { attendances, toggleOpen } = useToggleData(data);
  const { isApproved, toggleApproval } = useApprove(data.id);

  const label = data.grade
    ? `${data.grade}-${data.classNumber} (${data.name})`
    : data.name;

  const stats = `인원 ${attendances.filter((a) => a.statuses[0].status).length}/${attendances.length}명 · 외박 ${attendances.filter((a) => a.statuses[0].status?.name === "외박").length}명 · 외출 ${attendances.filter((a) => a.statuses[0].status?.name === "외출").length}명`;

  return (
    <div
      className="w-full h-15 flex items-center border-b border-greyscale-20 cursor-pointer text-h4 pl-2 xl:pl-10 pr-2 xl:pr-10"
      onClick={toggleOpen}>
      <div className="flex-1 flex items-center gap-2">
        <p className="text-accent">{label}</p>
        <span className="text-accent">·</span>
        <p className="text-blue-light">{stats}</p>
      </div>
      <div style={{ width: "140px" }}>
        <p className="text-greyscale-70">{approvedAt ?? "-"}</p>
      </div>
      <div style={{ width: "144px" }}>
        <p className="text-greyscale-70">{approvedTeacher ?? "-"}</p>
      </div>
      <div style={{ width: "196px" }} className="flex items-center justify-end">
        <div className="flex items-center gap-2 xl:gap-4">
          <div
            className="flex items-center gap-2"
            style={{ color: colors.green.light }}>
            {isApproved ? (
              <>
                <p className="text-accent">승인됨</p>
                <div
                style={{ color: colors.red.light }}
                onClick={(e) => e.stopPropagation()}>
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
                }}>
                승인하기
              </Button>
            )}
          </div>
          <ChevronIcon size={16} className="text-static-black" rotate={-90} />
        </div>
      </div>
    </div>
  );
};

export default RoomItem;