"use client";

import { Button, Checkbox, TextInput } from "@beep-ds/ui";
import { useGetCheckpoints } from "@/entities/checkpoints/queries";
import { EventDetail } from "@/entities/events/types";
import SearchBar from "@/entities/students/ui/SearchBar";
import GradeAccordion from "@/entities/students/ui/GradeAccordion";
import StudentItem from "@/entities/students/ui/StudentItem";
import { useSearch } from "@/entities/students/hooks/useSearch";
import { GRADES } from "@/shared/constants/grade";
import { CloseIcon } from "@/shared/icons/CloseIcon";
import { useEventForm } from "../hooks/useEventForm";

interface Props {
  date: string;
  detail?: EventDetail;
  onDone: () => void;
  onCancel: () => void;
}

const EventForm = ({ date, detail, onDone, onCancel }: Props) => {
  const checkpoints = useGetCheckpoints().data.data;
  const { query, onChange, result } = useSearch();
  const {
    name,
    setName,
    checkpointIds,
    toggleCheckpoint,
    toggleAllCheckpoints,
    students,
    selectedStudents,
    toggleSelected,
    disabled,
    isPending,
    submit,
  } = useEventForm({ date, detail, onDone });

  const allCheckpointIds = checkpoints.map((checkpoint) => checkpoint.id);
  const isAllChecked =
    allCheckpointIds.length > 0 &&
    checkpointIds.length === allCheckpointIds.length;

  return (
    <div className="w-full flex-1 flex flex-col gap-4">
      <TextInput
        label="행사명"
        value={name}
        onChange={(e) => setName(e.target.value.slice(0, 100))}
        placeholder="행사명을 입력해주세요."
        maxLength={100}
      />

      <div className="w-full flex flex-col gap-1">
        <span className="text-caption1 text-static-black">해당 교시</span>
        <div className="w-full flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <Checkbox
              checked={isAllChecked}
              onChange={() => toggleAllCheckpoints(allCheckpointIds)}
              size={20}
            />
            <span className="text-body text-static-black">전체</span>
          </div>
          {checkpoints.map((checkpoint) => (
            <div key={checkpoint.id} className="flex items-center gap-2.5">
              <Checkbox
                checked={checkpointIds.includes(checkpoint.id)}
                onChange={() => toggleCheckpoint(checkpoint.id)}
                size={20}
              />
              <span className="text-body text-static-black">
                {checkpoint.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col gap-1">
        <span className="text-caption1 text-static-black">학생 선택</span>
        <SearchBar query={query} onChange={onChange} />

        {students.size > 0 && (
          <div className="w-full flex items-start flex-wrap gap-2 pt-1">
            {[...students].map(([studentId, label]) => (
              <button
                key={studentId}
                type="button"
                onClick={() => toggleSelected(studentId)}
                className="flex items-center justify-center gap-1 px-2.5 py-2 rounded-full border border-blue-light text-caption1 text-blue-light cursor-pointer">
                {label}
                <CloseIcon size={8} />
              </button>
            ))}
          </div>
        )}

        <div className="w-full pt-1">
          {result.length > 0
            ? result.map((student) => (
                <StudentItem
                  data={student}
                  selectedStudents={selectedStudents}
                  toggleSelected={toggleSelected}
                  key={student.id}
                />
              ))
            : GRADES.map((grade) => (
                <GradeAccordion
                  grade={grade}
                  selectedStudents={selectedStudents}
                  toggleSelected={toggleSelected}
                  key={grade}
                />
              ))}
        </div>
      </div>

      <div className="flex-1" />

      <div className="w-full flex items-center gap-2">
        {detail && (
          <Button
            buttonSize="medium"
            buttonType="ghost"
            onClick={onCancel}
            style={{ flex: 1 }}>
            취소
          </Button>
        )}
        <Button
          buttonSize="medium"
          buttonType="primary"
          disabled={disabled}
          onClick={submit}
          style={{ flex: 1 }}>
          {isPending ? "저장 중..." : detail ? "저장" : "등록"}
        </Button>
      </div>
    </div>
  );
};

export default EventForm;
