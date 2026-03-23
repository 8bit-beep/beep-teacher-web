"use client";

import { Button } from "@bds-web/ui";
import { useState } from "react";
import { useUpdateMemo } from "../hooks/useUpdateMemo";

const grades = [
  { label: "1학년", value: 1 },
  { label: "2학년", value: 2 },
] as const;

const MemoEditor = ({ grade }: { grade: (typeof grades)[number]["value"] }) => {
  const { memo, onChange, save, isPending } = useUpdateMemo(grade);

  return (
    <>
      <textarea
        className="w-full h-48 p-2 rounded-medium shadow-modal outline-none resize-none text-body placeholder:text-greyscale-40"
        placeholder="메모를 입력해주세요."
        value={memo}
        onChange={onChange}
      />
      <Button onClick={save} disabled={isPending} buttonSize="large" buttonType="primary">
        작성 완료
      </Button>
    </>
  );
};

const MemoModal = () => {
  const [selectedGrade, setSelectedGrade] = useState<(typeof grades)[number]["value"]>(1);

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full flex items-center gap-2">
        {grades.map(({ label, value }) => {
          const isActive = selectedGrade === value;

          return (
            <button
              key={value}
              type="button"
              onClick={() => setSelectedGrade(value)}
              className={`flex-1 h-10 rounded-medium border text-body transition-colors ${
                isActive
                  ? "border-blue-light bg-blue-light text-static-white"
                  : "border-greyscale-20 bg-static-white text-greyscale-60"
              }`}>
              {label}
            </button>
          );
        })}
      </div>
      <MemoEditor key={selectedGrade} grade={selectedGrade} />
    </div>
  );
};

export default MemoModal;
