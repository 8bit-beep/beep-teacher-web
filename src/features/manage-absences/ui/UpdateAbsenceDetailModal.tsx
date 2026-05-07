"use client";

import { Button, DatePicker, Dropdown, modal } from "@bds-web/ui";
import { useUpdateAbsence } from "../hooks/useUpdateAbsence";
import { Absence } from "@/entities/absences/types";

interface Props {
  data: Absence;
}

const UpdateAbsenceDetailModal = ({ data }: Props) => {
  const {
    setSelectedType,
    selectedType,
    startAt,
    setStartAt,
    endAt,
    setEndAt,
    options,
    reason,
    setReason,
    submit,
    disabled,
  } = useUpdateAbsence(data);

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full flex flex-col gap-0.5 items-start">
        <span className="text-caption1 text-static-black">외박 사유</span>
        <Dropdown
          onSelect={setSelectedType}
          options={options}
          selected={selectedType}
          dropdownSize="large"
        />
      </div>
      <textarea
        className="w-full h-24 p-4 rounded-medium shadow-modal outline-none resize-none text-body placeholder:text-greyscale-40"
        placeholder="상세한 외박 사유를 작성해주세요. (255자 이내)"
        maxLength={255}
        value={reason}
        onChange={(e) => setReason(e.target.value.slice(0, 255))}
      />
      <div className="w-full flex flex-col gap-0.5">
        <span className="text-caption1 text-static-black">외박 기간</span>
        <div className="w-full flex items-center justify-between">
          <DatePicker
            date={startAt}
            onChangeDate={setStartAt}
            title="시작일 선택"
          />
          <span className="text-caption1 text-static-black">~</span>
          <DatePicker
            date={endAt}
            onChangeDate={setEndAt}
            title="종료일 선택"
          />
        </div>
      </div>
      <div className="w-full flex items-center gap-2">
        <Button
          buttonSize="large"
          buttonType="ghost"
          onClick={() => modal.close()}
          style={{ flex: 1 }}
        >
          취소
        </Button>
        <Button
          buttonSize="large"
          buttonType="primary"
          onClick={submit}
          disabled={disabled}
          style={{ flex: 1 }}
        >
          수정
        </Button>
      </div>
    </div>
  );
};

export default UpdateAbsenceDetailModal;
