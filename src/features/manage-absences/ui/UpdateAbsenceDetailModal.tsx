"use client";

import { Button, DatePicker, Dropdown, modal } from "@bds-web/ui";
import ExceptionItem from "./ExceptionItem";
import { useUpdateAbsence } from "../hooks/useUpdateAbsence";
import { Absence } from "@/entities/absences/types";
import DeleteAbsenceModal from "./DeleteAbsenceModal";

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
    deleteException,
    exceptions,
    options,
    reason,
    setReason,
    submit,
    disabled,
  } = useUpdateAbsence(data);

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
      <div className="w-full flex flex-col gap-2">
        {exceptions.length > 0 && (
          <div className="w-full max-h-32 overflow-y-scroll">
            {exceptions.map((exception) => (
              <ExceptionItem
                data={exception}
                key={exception.checkpointId}
                deleteException={deleteException}
              />
            ))}
          </div>
        )}
      </div>
      <div className="w-full flex flex-col gap-2">
        <Button
          buttonSize="medium"
          buttonType="primary"
          onClick={submit}
          disabled={disabled}
        >
          수정 완료
        </Button>
        <Button
          buttonSize="medium"
          buttonType="danger"
          onClick={() =>
            modal.open({
              title: "결석 정보를 삭제하시겠습니까?",
              content: <DeleteAbsenceModal absenceId={data.absenceId!} />,
            })
          }
          disabled={disabled}
        >
          삭제
        </Button>
      </div>
    </div>
  );
};

export default UpdateAbsenceDetailModal;
