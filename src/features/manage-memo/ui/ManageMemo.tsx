"use client";

import MemoIcon from "@/shared/icons/MemoIcon";
import { modal } from "@bds-web/ui";
import MemoModal from "./MemoModal";

const ManageMemo = () => {
  return (
    <button
      className="h-10 px-6 rounded-large shadow-modal flex items-center gap-2.5 bg-static-white"
      onClick={() => modal.open({ title: "메모", content: <MemoModal /> })}>
      <MemoIcon className="text-blue-light" size={20} />
      <p className="text-body text-static-black">메모</p>
    </button>
  );
};

export default ManageMemo;
