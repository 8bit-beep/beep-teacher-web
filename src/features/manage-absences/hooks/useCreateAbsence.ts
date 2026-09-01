import { DropdownItem, modal } from "@beep-ds/ui";
import { useState } from "react";
import { useSelectStudents } from "@/entities/students/hooks/useSelectStudents";
import { parseDate } from "@/shared/utils/pare-date";
import { toast } from "@cher1shrxd/toast";
import {
  TOAST_ISSUE_DURATION,
  TOAST_SUCCESS_DURATION,
} from "@/shared/constants/toast";
import { useGetAbsenceReason } from "./useGetAbsenceReason";
import { useRouter } from "@cher1shrxd/loading";
import {
  getCreateAbsenceToastState,
  useCreateAbsenceMutation,
} from "@/entities/absences/mutations";

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
  initialPhase?: "list" | "add";
}

export const useCreateAbsence = ({
  initialSelectedStudents,
  initialPhase = "list",
}: Props = {}) => {
  const router = useRouter();
  const { options } = useGetAbsenceReason();
  const { mutateAsync } = useCreateAbsenceMutation();
  const { selectedStudents, setSelectedStudents } =
    useSelectStudents(initialSelectedStudents);
  const [phase, setPhase] = useState<"list" | "add">(initialPhase);
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
        "외박 사유를 선택해주세요.",
        TOAST_ISSUE_DURATION,
      );
      return;
    }
    if (!reason.trim()) {
      toast.warning(
        "조건 미충족",
        "상세 외박 사유를 작성해주세요.",
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
        "중복된 외박 기간",
        "이미 추가된 날짜에 외박 정보를 추가할 수 없습니다.",
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

  const handleStartAtChange = (date: Date) => {
    setStartAt(date);

    if (date > endAt) {
      setEndAt(date);
    }
  };

  const handleEndAtChange = (date: Date) => {
    if (date < startAt) {
      setEndAt(startAt);
      return;
    }

    setEndAt(date);
  };

  const submit = async () => {
    if (selectedStudents.length === 0) {
      toast.warning(
        "조건 미충족",
        "외박 학생을 선택해주세요.",
        TOAST_ISSUE_DURATION,
      );
      return;
    }
    if (drafts.length === 0) {
      toast.warning(
        "조건 미충족",
        "추가할 외박 정보를 먼저 등록해주세요.",
        TOAST_ISSUE_DURATION,
      );
      return;
    }

    setIsPending(true);

    try {
      const responses = await Promise.all(
        drafts.map((draft) =>
          mutateAsync({
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
      const toastState = getCreateAbsenceToastState(
        skippedUserIds,
        selectedStudents.length * drafts.length,
      );

      if (toastState.type === "success") {
        toast.success(
          toastState.title,
          toastState.description,
          TOAST_SUCCESS_DURATION,
        );
      } else {
        toast.warning(
          toastState.title,
          toastState.description,
          TOAST_ISSUE_DURATION,
        );
      }

      router.refresh();
      modal.closeAll();
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
    setSelectedStudents,
    selectedType,
    setSelectedType,
    reason,
    setReason,
    startAt,
    setStartAt: handleStartAtChange,
    endAt,
    setEndAt: handleEndAtChange,
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
