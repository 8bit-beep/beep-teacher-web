"use client";

import { Button } from "@bds-web/ui";
import { useUpdateMemo } from "../hooks/useUpdateMemo";

const MemoModal = () => {
  const { memo, onChange, save, isPending } = useUpdateMemo();

  return (
    <div className="w-full flex flex-col gap-5">
      <textarea
        className="w-full h-48 p-2 rounded-medium shadow-modal outline-none resize-none text-body placeholder:text-greyscale-40"
        placeholder="메모를 입력해주세요."
        value={memo}
        onChange={onChange}
      />
      <Button onClick={save} disabled={isPending}>
        작성 완료
      </Button>
    </div>
  );
};

export default MemoModal;
