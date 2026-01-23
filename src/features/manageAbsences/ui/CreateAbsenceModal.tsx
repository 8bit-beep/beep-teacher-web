"use client";

import { Button, DatePicker, Dropdown } from "@bds-web/ui";
import SelectStudents from "./SelectStudents";
import ExceptionItem from "./ExceptionItem";
import CreateException from "./CreateException";
import { useCreateAbsence } from "../hooks/useCreateAbsence";

const CreateAbsenceModal = () => {
  const {
    phase,
    setPhase,
    selectedStudents,
    toggleSelected,
    setSelectedType,
    selectedType,
    startAt,
    setStartAt,
    endAt,
    setEndAt,
    deleteException,
    createException,
    exceptions,
    options,
    reason,
    setReason,
    submit,
    disabled,
  } = useCreateAbsence();

  if (phase === "selectStudents") {
    return (
      <SelectStudents
        selectedStudents={selectedStudents}
        toggleSelected={toggleSelected}
        setPhase={setPhase}
      />
    );
  }

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
        className="w-full h-24 p-4 rounded-medium shadow-modal outline-none resize-none text-body"
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
      <div className="w-full max-h-32 mb-4 overflow-y-scroll">
        <div className="w-full flex flex-col">
          {exceptions.map((exception) => (
            <ExceptionItem
              data={exception}
              key={exception.checkpointId}
              deleteException={deleteException}
            />
          ))}
          <div className="h-2" />
          <CreateException createException={createException} />
        </div>
      </div>
      <Button
        buttonSize="large"
        buttonType="primary"
        onClick={submit}
        disabled={disabled}>
        결석자 생성하기
      </Button>
    </div>
  );
};

export default CreateAbsenceModal;
