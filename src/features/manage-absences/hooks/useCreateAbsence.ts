import { DropdownItem, modal } from "@bds-web/ui";
import { useState } from "react";
import { useSelectStudents } from "./useSelectStudents";
import { parseDate } from "@/shared/utils/pare-date";
import { toast } from "@cher1shrxd/toast";
import {
  TOAST_ISSUE_DURATION,
  TOAST_SUCCESS_DURATION,
} from "@/shared/constants/toast";
import { useGetAbsenceReason } from "./useGetAbsenceReason";
import { AbsenceApi } from "@/entities/absences/api";
import { useRouter } from "@cher1shrxd/loading";
import { AxiosError } from "axios";
import { Error } from "@/shared/types/error";

interface DraftAbsence {
  id: number;
  type: DropdownItem;
  reason: string;
  startDate: string;
  endDate: string;
}

const hasOverlappingDateRange = (
  startDate: string,
  endDate: string,
  targetStartDate: string,
  targetEndDate: string,
) => startDate <= targetEndDate && targetStartDate <= endDate;

interface Props {
  initialSelectedStudents?: number[];
  initialPhase?: "list" | "selectStudents";
}

export const useCreateAbsence = ({
  initialSelectedStudents,
  initialPhase = "list",
}: Props = {}) => {
  const router = useRouter();
  const { options } = useGetAbsenceReason();
  const { selectedStudents, toggleSelected } =
    useSelectStudents(initialSelectedStudents);
  const [phase, setPhase] = useState<"list" | "selectStudents" | "add">(
    initialPhase,
  );
  const [selectedType, setSelectedType] = useState<DropdownItem | null>(null);
  const [reason, setReason] = useState("");
  const [startAt, setStartAt] = useState<Date>(new Date());
  const [endAt, setEndAt] = useState<Date>(new Date());
  const [drafts, setDrafts] = useState<DraftAbsence[]>([]);
  const [isPending, setIsPending] = useState(false);

  const resetDraftForm = () => {
    setSelectedType(null);
    setReason("");
    setStartAt(new Date());
    setEndAt(new Date());
  };

  const addDraft = () => {
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
    const hasConflictingDraft = drafts.some((draft) =>
      hasOverlappingDateRange(
        draft.startDate,
        draft.endDate,
        startDate,
        endDate,
      ),
    );

    if (hasConflictingDraft) {
      toast.warning(
        "중복된 결석 기간",
        "이미 추가된 날짜에 결석 정보를 추가할 수 없습니다.",
        TOAST_ISSUE_DURATION,
      );
      return;
    }

    setDrafts((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: selectedType,
        reason: reason.trim(),
        startDate,
        endDate,
      },
    ]);
    resetDraftForm();
    setPhase("list");
  };

  const deleteDraft = (id: number) => {
    setDrafts((prev) => prev.filter((draft) => draft.id !== id));
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
    if (drafts.length === 0) {
      toast.warning(
        "조건 미충족",
        "추가할 결석 정보를 먼저 등록해주세요.",
        TOAST_ISSUE_DURATION,
      );
      return;
    }

    setIsPending(true);

    try {
      const responses = await Promise.all(
        drafts.map((draft) =>
          AbsenceApi.createAbsence({
            userIds: selectedStudents,
            startDate: draft.startDate,
            endDate: draft.endDate,
            reason: draft.reason,
            typeId: Number(draft.type.value),
            checkpoints: [],
          }),
        ),
      );

      const skippedUserIds = responses.flatMap(
        (response) => response.data.skippedUserIds,
      );
      const totalRequestedCount = selectedStudents.length * drafts.length;

      if (
        totalRequestedCount > 0 &&
        skippedUserIds.length === totalRequestedCount
      ) {
        toast.warning(
          "이미 추가된 대상",
          "선택한 대상은 이미 같은 조건의 결석 정보가 등록되어 있습니다.",
          TOAST_ISSUE_DURATION,
        );
      } else if (skippedUserIds.length > 0) {
        toast.warning(
          "일부 결석 처리 실패",
          `다음 학생들의 결석 처리에 실패했습니다: ${Array.from(new Set(skippedUserIds)).join(", ")}`,
          TOAST_ISSUE_DURATION,
        );
      } else {
        toast.success(
          "결석 처리 완료",
          "선택한 학생들의 결석이 정상적으로 처리되었습니다.",
          TOAST_SUCCESS_DURATION,
        );
      }

      router.refresh();
      modal.closeAll();
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      toast.error(
        "결석 처리 실패",
        axiosError.response?.data.message ||
          "결석 처리 중 오류가 발생했습니다.",
        TOAST_ISSUE_DURATION,
      );
    } finally {
      setIsPending(false);
    }
  };

  const disabled =
    selectedStudents.length === 0 ||
    drafts.length === 0 ||
    isPending;

  const addDisabled = !selectedType || !reason.trim();

  return {
    phase,
    setPhase,
    selectedStudents,
    toggleSelected,
    selectedType,
    setSelectedType,
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
    isPending,
  };
};
