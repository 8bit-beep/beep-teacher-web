"use client";

import { useMemo, useState } from "react";
import { Button, DatePicker, Dropdown, DropdownItem, modal } from "@bds-web/ui";
import { Absence } from "@/entities/absences/types";
import UpdateAbsenceDetailModal from "./UpdateAbsenceDetailModal";
import { useGetAbsenceReason } from "../hooks/useGetAbsenceReason";
import { CloseIcon } from "@/shared/icons/CloseIcon";
import DeleteAbsenceModal from "./DeleteAbsenceModal";
import SelectStudents from "./SelectStudents";
import { useSelectStudents } from "../hooks/useSelectStudents";
import { useResolveAbsenceUserIds } from "../hooks/useResolveAbsenceUserIds";
import { AbsenceApi } from "@/entities/absences/api";
import { parseDate } from "@/shared/utils/pare-date";
import { toast } from "@cher1shrxd/toast";
import {
  TOAST_ISSUE_DURATION,
  TOAST_SUCCESS_DURATION,
} from "@/shared/constants/toast";
import { AxiosError } from "axios";
import { Error } from "@/shared/types/error";
import { useRouter } from "@cher1shrxd/loading";

interface Props {
  data: Absence[];
}

const UpdateAbsenceModal = ({ data }: Props) => {
  const router = useRouter();
  const { nameById, options } = useGetAbsenceReason();
  const [absences, setAbsences] = useState<Absence[]>(data);
  const allTargetStudents = useMemo(
    () => absences.flatMap((absence) => absence.targetStudents),
    [absences],
  );
  const { resolvedUserIds: initialSelectedStudents, isResolving } =
    useResolveAbsenceUserIds(allTargetStudents);
  const { selectedStudents, toggleSelected } =
    useSelectStudents(initialSelectedStudents);
  const [phase, setPhase] = useState<"list" | "selectStudents" | "add">("list");
  const [isPending, setIsPending] = useState(false);
  const [selectedType, setSelectedType] = useState<DropdownItem | null>(null);
  const [reason, setReason] = useState("");
  const [startAt, setStartAt] = useState<Date>(new Date());
  const [endAt, setEndAt] = useState<Date>(new Date());
  const persistedAbsences = absences.filter(
    (absence) => absence.absenceId !== null,
  );

  const resetDraftForm = () => {
    setSelectedType(null);
    setReason("");
    setStartAt(new Date());
    setEndAt(new Date());
  };

  const addDraft = async () => {
    if (!selectedType) {
      toast.warning(
        "조건 미충족",
        "결석 사유를 선택해주세요.",
        TOAST_ISSUE_DURATION,
      );
      return;
    }
    if (!reason.trim()) {
      toast.warning(
        "조건 미충족",
        "상세 결석 사유를 작성해주세요.",
        TOAST_ISSUE_DURATION,
      );
      return;
    }

    const startDate = parseDate(startAt);
    const endDate = parseDate(endAt);

    setIsPending(true);

    try {
      const response = await AbsenceApi.createAbsence({
        userIds: selectedStudents,
        startDate,
        endDate,
        reason: reason.trim(),
        typeId: Number(selectedType.value),
        checkpoints: [],
      });

      if (response.data.absenceId !== null) {
        setAbsences((prev) => [
          ...prev,
          {
            absenceId: response.data.absenceId,
            isGrouped: selectedStudents.length > 1,
            targetStudents: allTargetStudents,
            startDate,
            endDate,
            checkpoints: [],
            reason: reason.trim(),
            typeId: Number(selectedType.value),
          },
        ]);
      }

      if (response.data.skippedUserIds.length > 0) {
        toast.warning(
          "일부 결석 처리 실패",
          `다음 학생들의 결석 처리에 실패했습니다: ${response.data.skippedUserIds.join(", ")}`,
          TOAST_ISSUE_DURATION,
        );
      } else {
        toast.success(
          "결석 추가 완료",
          "결석 사유가 정상적으로 추가되었습니다.",
          TOAST_SUCCESS_DURATION,
        );
      }

      if (response.data.absenceId === null) {
        toast.warning(
          "목록 갱신 필요",
          "생성은 처리됐지만 목록 반영을 위해 상세 및 수정을 다시 열어주세요.",
          TOAST_ISSUE_DURATION,
        );
      }

      resetDraftForm();
      setPhase("list");
      router.refresh();
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      toast.error(
        "결석 추가 실패",
        axiosError.response?.data.message ||
          "결석 추가 중 오류가 발생했습니다.",
        TOAST_ISSUE_DURATION,
      );
    } finally {
      setIsPending(false);
    }
  };

  const submit = async () => {
    if (selectedStudents.length === 0) {
      toast.warning(
        "조건 미충족",
        "결석 학생을 선택해주세요.",
        TOAST_ISSUE_DURATION,
      );
      return;
    }

    setIsPending(true);

    try {
      const updateResponses = await Promise.all(
        persistedAbsences.map((absence) =>
          AbsenceApi.updateAbsence(absence.absenceId!, {
            userIds: selectedStudents,
            startDate: parseDate(new Date(absence.startDate)),
            endDate: parseDate(new Date(absence.endDate)),
            reason: absence.reason,
            typeId: absence.typeId,
            checkpoints: absence.checkpoints.map((checkpoint) => ({
              checkpointId: checkpoint.checkpointId,
              date: checkpoint.date,
            })),
          }),
        ),
      );

      const skippedUserIds = updateResponses.flatMap(
        (response) => response.data.skippedUserIds,
      );

      if (skippedUserIds.length > 0) {
        toast.warning(
          "일부 결석 정보 수정 실패",
          `다음 학생들의 결석 정보 수정에 실패했습니다: ${Array.from(new Set(skippedUserIds)).join(", ")}`,
          TOAST_ISSUE_DURATION,
        );
      } else {
        toast.success(
          "결석 인원 수정 완료",
          "선택한 학생들로 결석 인원이 정상적으로 수정되었습니다.",
          TOAST_SUCCESS_DURATION,
        );
      }

      router.refresh();
      modal.closeAll();
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      toast.error(
        "결석 인원 수정 실패",
        axiosError.response?.data.message ||
          "결석 인원 수정 중 오류가 발생했습니다.",
        TOAST_ISSUE_DURATION,
      );
    } finally {
      setIsPending(false);
    }
  };

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
            disabled={isPending || !selectedType || !reason.trim()}
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
      <div className="w-full flex flex-col gap-2">
        {absences.map((absence) => {
          const typeName = nameById.get(absence.typeId) ?? "기타";

          return (
            <div
              key={absence.absenceId}
              className="w-full flex items-center gap-4 rounded-medium border border-greyscale-20 px-4 py-3"
            >
              <button
                type="button"
                className="flex-1 text-left cursor-pointer"
                onClick={() =>
                  modal.open({
                    title: "결석 상세 수정",
                    content:
                      absence.absenceId === null ? null : (
                        <UpdateAbsenceDetailModal data={absence} />
                      ),
                  })
                }
                disabled={absence.absenceId === null}
              >
                <p className="flex items-center gap-4">
                  <span className="text-accent text-blue-light">
                    {typeName}
                  </span>
                  <span className="text-body text-static-black">
                    {absence.startDate} ~ {absence.endDate}
                  </span>
                </p>
              </button>
              <button
                type="button"
                className="text-greyscale-50 cursor-pointer"
                onClick={() =>
                  absence.absenceId !== null &&
                  modal.open({
                    title: "결석 정보를 삭제하시겠습니까?",
                    content: (
                      <DeleteAbsenceModal absenceId={absence.absenceId} />
                    ),
                  })
                }
                disabled={absence.absenceId === null}
              >
                <CloseIcon />
              </button>
            </div>
          );
        })}
      </div>
      <div className="w-full flex items-center gap-4">
        <Button
          buttonSize="medium"
          buttonType="ghost"
          showIcon
          style={{ width: "160px" }}
          onClick={() => setPhase("selectStudents")}
        >
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
        disabled={isResolving || isPending || selectedStudents.length === 0}
      >
        완료
      </Button>
    </div>
  );
};

export default UpdateAbsenceModal;
