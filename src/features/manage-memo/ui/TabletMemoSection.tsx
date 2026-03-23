"use client";

import ChevronIcon from "@/shared/icons/ChevronIcon";
import AlertIcon from "@/shared/icons/AlertIcon";
import MemoIcon from "@/shared/icons/MemoIcon";
import { useGetMemo } from "@/entities/memo/queries";
import { useState } from "react";
import MemoPanel from "./MemoPanel";

const TabletMemoSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const defaultGrade = 1;
  const { data } = useGetMemo(defaultGrade);
  const hasUnread = !data.data.isRead;

  return (
    <section className="w-full shrink-0 hidden lg:flex xl:hidden px-13.5">
      <div className="w-full rounded-large bg-static-white shadow-modal overflow-hidden">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full px-5 py-4 flex items-center justify-between text-left">
          <div className="flex items-center gap-3">
            <div className="relative">
              {hasUnread && (
                <AlertIcon className="absolute -top-1 -left-1.5 text-red-light" size={12} />
              )}
              <MemoIcon className="text-blue-light" size={20} />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-body text-static-black">메모</h2>
            </div>
          </div>
          <ChevronIcon
            className="text-greyscale-60 transition-transform"
            size={20}
            rotate={isOpen ? 0 : 180}
          />
        </button>
        {isOpen && (
          <div className="w-full px-5 pb-5 border-t border-greyscale-20">
            <div className="w-full pt-5">
              <MemoPanel />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TabletMemoSection;
