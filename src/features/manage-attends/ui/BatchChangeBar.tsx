"use client";

import { Button, Dropdown, DropdownItem } from "@beep-ds/ui";
import CheckIcon from "@/shared/icons/CheckIcon";

interface Props {
  count: number;
  options: DropdownItem[];
  status: DropdownItem | null;
  setStatus: (item: DropdownItem | null) => void;
  isPending: boolean;
  onApply: () => void;
}

const BatchChangeBar = ({
  count,
  options,
  status,
  setStatus,
  isPending,
  onApply,
}: Props) => {
  return (
    <div className="w-full shrink-0 border-t border-greyscale-10 p-4 flex items-center justify-between gap-2 bg-static-white">
      <div className="flex items-center gap-2.5">
        <p className="text-h4 text-static-black whitespace-nowrap">{count}명을</p>
        <Dropdown
          selected={status}
          onSelect={setStatus}
          options={options}
          dropdownSize="small"
          width="120px"
          openDirection="up"
        />
        <p className="text-h4 text-static-black whitespace-nowrap">
          (으)로 변경하기
        </p>
      </div>
      <div className="hidden min-[453px]:block">
        <Button
          buttonSize="small"
          buttonType="primary"
          disabled={!status || isPending}
          onClick={onApply}>
          {isPending ? "변경 중..." : "완료"}
        </Button>
      </div>
      <button
        type="button"
        disabled={!status || isPending}
        onClick={onApply}
        className="min-[453px]:hidden w-9 h-9 shrink-0 rounded-full bg-blue-light text-static-white flex items-center justify-center cursor-pointer disabled:bg-greyscale-20">
        <CheckIcon size={20} />
      </button>
    </div>
  );
};

export default BatchChangeBar;
