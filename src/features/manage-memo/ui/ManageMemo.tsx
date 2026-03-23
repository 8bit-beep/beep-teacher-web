"use client";

import MemoIcon from "@/shared/icons/MemoIcon";
import AlertIcon from "@/shared/icons/AlertIcon";
import { modal } from "@bds-web/ui";
import MemoModal from "./MemoModal";
import { useGetMemo } from "@/entities/memo/queries";
import { useMarkAsReadMutation } from "@/entities/memo/mutations";

const ManageMemo = () => {
  const defaultGrade = 1;
  const { data } = useGetMemo(defaultGrade);
  const { mutate: markAsRead } = useMarkAsReadMutation();
  const hasUnread = !data.data.isRead;

  return (
    <button
      className={`relative h-10 px-6 rounded-large shadow-modal flex items-center gap-2.5 bg-static-white ${hasUnread ? "outline-2 outline-red-light" : ""}`}
      onClick={() => {
        if (hasUnread && data.data.exists !== false) {
          markAsRead({ grade: defaultGrade, content: data.data.content });
        }
        modal.open({ title: "메모", content: <MemoModal /> });
      }}>
      <div className="relative">
        {hasUnread && <AlertIcon className="absolute -top-1 -left-1.5 text-red-light" size={12} />}
        <MemoIcon className="text-blue-light" size={20} />
      </div>
      <p className="text-body text-static-black">메모</p>
    </button>
  );
};

export default ManageMemo;
