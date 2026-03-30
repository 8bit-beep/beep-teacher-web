"use client";

import { Button, DatePicker, Dropdown } from "@bds-web/ui";
import SelectStudents from "./SelectStudents";
import { useCreateAbsence } from "../hooks/useCreateAbsence";
import { CloseIcon } from "@/shared/icons/CloseIcon";

interface Props {
  initialSelectedStudents?: number[];
  initialPhase?: "list" | "selectStudents" | "add";
}

const CreateAbsenceModal = ({
  initialSelectedStudents,
  initialPhase,
}: Props) => {
  const {
    phase,
    setPhase,
    selectedStudents,
    toggleSelected,
    setSelectedType,
    selectedType,
    reason,
    setReason,
    startAt,
    setStartAt,
    endAt,
    setEndAt,
    options,
    drafts,
    deleteDraft,
    addDraft,
    addDisabled,
    resetDraftForm,
    submit,
    disabled,
  } = useCreateAbsence({
    initialSelectedStudents,
    initialPhase,
  });

  if (phase === "selectStudents") {
    return (
      <SelectStudents
        selectedStudents={selectedStudents}
        toggleSelected={toggleSelected}
        onDone={() => setPhase("list")}
      />
    );
  }

  if (phase === "add") {
    return (
      <div className="w-full flex flex-col gap-5">
        <div className="w-full flex flex-col gap-0.5 items-start">
          <span className="text-caption1 text-static-black">결석 사유</span>
          <Dropdown
            onSelect={setSelectedType}
            options={options}
            selected={selectedType}
            dropdownSize="large"
          />
        </div>
        <textarea
          className="w-full h-24 p-4 rounded-medium shadow-modal outline-none resize-none text-body placeholder:text-greyscale-40"
          placeholder="상세한 결석 사유를 작성해주세요. (500자 이내)"
          maxLength={500}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className="w-full flex flex-col gap-0.5">
          <span className="text-caption1 text-static-black">결석 기간</span>
          <div className="w-full flex items-center gap-2.5 justify-between">
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
            buttonSize="medium"
            buttonType="ghost"
            style={{ flex: 1 }}
            onClick={() => {
              resetDraftForm();
              setPhase("list");
            }}
          >
            취소
          </Button>
          <Button
            buttonSize="medium"
            buttonType="primary"
            style={{ flex: 1 }}
            onClick={addDraft}
            disabled={addDisabled}
          >
            추가
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-5">
      <button
        type="button"
        className="w-full rounded-medium border border-dashed border-greyscale-30 py-2 flex flex-col items-center justify-center gap-1 cursor-pointer"
        onClick={() => setPhase("add")}
      >
        <span className="text-title3 text-blue-light">+</span>
      </button>
      {drafts.length > 0 && (
        <div className="w-full flex flex-col gap-2">
          {drafts.map((draft) => (
            <div
              key={draft.id}
              className="w-full flex items-center gap-4 rounded-medium border border-greyscale-20 px-4 py-3">
              <p className="flex items-center gap-4">
                <span className="text-accent text-blue-light">
                  {draft.type.name}
                </span>
                <span className="text-body text-static-black">
                  {draft.startDate} ~ {draft.endDate}
                </span>
              </p>
              <div className="flex-1" />
              <button
                type="button"
                className="text-greyscale-50 cursor-pointer"
                onClick={() => deleteDraft(draft.id)}
              >
                <CloseIcon />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="w-full flex items-center gap-4">
        <Button
          buttonSize="medium"
          buttonType="ghost"
          showIcon
          style={{ width: "160px" }}
          onClick={() => setPhase("selectStudents")}>
          결석자 선택하기
        </Button>
        <p className="text-blue-light text-caption1">
          {selectedStudents.length}명 선택됨
        </p>
      </div>

      <Button
        buttonSize="large"
        buttonType="primary"
        onClick={submit}
        disabled={disabled}
      >
        결석자 생성하기
      </Button>
    </div>
  );
};

export default CreateAbsenceModal;
