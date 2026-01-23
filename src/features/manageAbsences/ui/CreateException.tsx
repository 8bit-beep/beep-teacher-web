"use client";

import { parseDate } from "@/shared/utils/pare-date";
import { Button, DatePicker, Dropdown } from "@bds-web/ui";
import { useCreateException } from "../hooks/useCreateException";

interface Props {
  createException: (date: string, checkpointId: number) => void;
}

const CreateException = ({ createException }: Props) => {
  const {
    isCreateMode,
    setIsCreateMode,
    options,
    selectedCheckpoint,
    setSelectedCheckpoint,
    selectedDate,
    setSelectedDate,
  } = useCreateException();

  if (!isCreateMode) {
    return (
      <Button
        buttonSize="small"
        buttonType="text"
        onClick={() => setIsCreateMode(true)} style={{ marginTop: 8 }}>
        결석 예외일 추가하기
      </Button>
    );
  }

  return (
    <div className="w-full flex flex-col gap-2 mt-2">
      <div className="w-full flex items-center gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-caption2 text-greyscale-70">예외일</span>
          <DatePicker
            date={selectedDate}
            onChangeDate={setSelectedDate}
            title="예외일 선택"
          />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <span className="text-caption2 text-greyscale-70">
            예외일 출석 시간
          </span>
          <Dropdown
            options={options}
            selected={selectedCheckpoint}
            onSelect={setSelectedCheckpoint}
            dropdownSize="large"
          />
        </div>
      </div>
      <div className="w-full flex items-center gap-2">
        <Button
          buttonSize="small"
          buttonType="secondary"
          onClick={() => {
            if (selectedCheckpoint && selectedDate) {
              createException(
                parseDate(selectedDate),
                Number(selectedCheckpoint.value),
              );
              setIsCreateMode(false);
            }
          }}
          style={{ flex: 1 }}>
          추가하기
        </Button>
        <Button
          buttonSize="small"
          buttonType="danger"
          onClick={() => setIsCreateMode(false)}>
          취소
        </Button>
      </div>
    </div>
  );
};

export default CreateException;
