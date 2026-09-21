import { DropdownItem, modal } from "@beep-ds/ui";
import { Absence } from "@/entities/absences/types";
import { useState } from "react";
import { useSelectStudents } from "@/entities/students/hooks/useSelectStudents";
import { parseDate } from "@/shared/utils/pare-date";
import { hasOverlappingDateRange } from "@/shared/utils/date-range";
import { toast } from "@cher1shrxd/toast";
import {
  TOAST_DETAIL_DURATION,
  TOAST_ISSUE_DURATION,
  TOAST_SUCCESS_DURATION,
} from "@/shared/constants/toast";
import { useGetAbsenceReason } from "./useGetAbsenceReason";
import { useFindRegisteredAbsences } from "./useFindRegisteredAbsences";
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

const MAX_TOAST_ABSENCES = 3;

interface RegisteredAbsence {
  absence: Absence;
  studentNames: string[];
}

const summarizeRegisteredAbsences = (
  registeredAbsences: RegisteredAbsence[],
  nameById: Map<number, string>,
) => {
  const summary = registeredAbsences
    .slice(0, MAX_TOAST_ABSENCES)
    .map(({ absence, studentNames }) => {
      const typeName = nameById.get(absence.typeId) ?? "외박";

      return `${studentNames.join(", ")} ${typeName} ${absence.startDate} ~ ${absence.endDate}`;
    })
    .join(" / ");
  const restCount = registeredAbsences.length - MAX_TOAST_ABSENCES;

  return `${summary}${restCount > 0 ? ` 외 ${restCount}건` : ""}`;
};

interface Props {
  initialSelectedStudents?: number[];
  initialPhase?: "list" | "add";
}

export const useCreateAbsence = ({
  initialSelectedStudents,
  initialPhase = "list",
}: Props = {}) => {
  const router = useRouter();
  const { options, nameById } = useGetAbsenceReason();
  const { mutateAsync } = useCreateAbsenceMutation();
  const findRegisteredAbsences = useFindRegisteredAbsences();
  const { selectedStudents, setSelectedStudents } =
    useSelectStudents(initialSelectedStudents);
  const [phase, setPhase] = useState<"list" | "add">(initialPhase);
  const [selectedType, setSelectedType] = useState<DropdownItem | null>(null);
  const [reason, setReason] = useState("");
  const [startAt, setStartAt] = useState<Date>(new Date());
  const [endAt, setEndAt] = useState<Date>(new Date());
  const [drafts, setDrafts] = useState<DraftAbsence[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

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

    setIsChecking(true);

    const registeredAbsences = await findRegisteredAbsences(selectedStudents, {
      startDate,
      endDate,
    })
      .catch(() => [])
      .finally(() => setIsChecking(false));

    if (registeredAbsences.length > 0) {
      toast.warning(
        "이미 등록된 날짜입니다",
        `${summarizeRegisteredAbsences(registeredAbsences, nameById)} 일정이 이미 등록되어 있어 추가할 수 없습니다.`,
        TOAST_DETAIL_DURATION,
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

  const applySelectedStudents = async (userIds: number[]) => {
    if (drafts.length === 0) {
      setSelectedStudents(userIds);
      return true;
    }

    const results = (
      await Promise.all(
        drafts.map((draft) =>
          findRegisteredAbsences(userIds, draft).catch(() => []),
        ),
      )
    ).flat();

    if (results.length === 0) {
      setSelectedStudents(userIds);
      return true;
    }

    const uniqueResults = Array.from(
      new Map(
        results.map((result) => [
          `${result.absence.source}-${result.absence.absenceId}-${result.absence.startDate}-${result.absence.endDate}-${result.userIds.join(",")}`,
          result,
        ]),
      ).values(),
    );

    toast.warning(
      "이미 등록된 날짜입니다",
      `${summarizeRegisteredAbsences(uniqueResults, nameById)} 일정이 이미 등록되어 있어 대상으로 선택할 수 없습니다.`,
      TOAST_DETAIL_DURATION,
    );

    return false;
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

      const duplicatedDrafts = drafts.filter(
        (_, index) => responses[index].data.skippedUserIds.length > 0,
      );
      const duplicatedDates = duplicatedDrafts
        .map((draft) => `${draft.startDate} ~ ${draft.endDate}`)
        .join(", ");
      const toastState =
        duplicatedDrafts.length === 0
          ? getCreateAbsenceToastState([], 0)
          : {
              type: "warning" as const,
              title: "이미 등록된 날짜입니다",
              description:
                duplicatedDrafts.length === drafts.length
                  ? `${duplicatedDates}에는 이미 외박 정보가 등록되어 있어 추가할 수 없습니다.`
                  : `${duplicatedDates}는 이미 등록되어 제외하고, 나머지 날짜만 등록되었습니다.`,
            };

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

  const addDisabled = !selectedType || !reason.trim() || isChecking;

  return {
    phase,
    setPhase,
    selectedStudents,
    setSelectedStudents,
    applySelectedStudents,
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
