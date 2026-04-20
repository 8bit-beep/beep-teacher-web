"use client";

import { Button, DatePicker, Dropdown, modal } from "@bds-web/ui";
import { useCreateAbsence } from "../hooks/useCreateAbsence";
import { CloseIcon } from "@/shared/icons/CloseIcon";
import SelectStudentsModal from "./SelectStudentsModal";

interface Props {
  initialSelectedStudents?: number[];
  initialPhase?: "list" | "add";
}

const CreateAbsenceModal = ({
  initialSelectedStudents,
  initialPhase,
}: Props) => {
  const {
    phase,
    setPhase,
    selectedStudents,
    setSelectedStudents,
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

  if (phase === "add") {
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
            buttonSize="large"
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
            buttonSize="large"
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
              <Button
                buttonSize="small"
                buttonType="text"
                onClick={() => deleteDraft(draft.id)}
                style={{ padding: 0, minWidth: "auto", height: "auto" }}
              >
                <CloseIcon />
              </Button>
            </div>
          ))}
        </div>
      )}
      <Button
        buttonSize="medium"
        buttonType="text"
        onClick={() => setPhase("add")}
        style={{
          width: "100%",
          border: "1px dashed var(--color-greyscale-30)",
          borderRadius: "var(--radius-medium)",
          paddingTop: "8px",
          paddingBottom: "8px",
        }}
      >
        <span className="text-title3 text-blue-light">+</span>
      </Button>

      <div className="w-full flex items-center gap-4">
        <Button
          buttonSize="medium"
          buttonType="ghost"
          showIcon
          style={{ width: "160px" }}
          onClick={() =>
            modal.open({
              title: "대상 선택하기",
              content: (
                <SelectStudentsModal
                  initialSelectedStudents={selectedStudents}
                  onApply={setSelectedStudents}
                />
              ),
            })
          }
        >
          대상 선택하기
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
        완료
      </Button>
    </div>
  );
};

export default CreateAbsenceModal;
