import { DropdownItem } from "@bds-web/ui";
import { useState } from "react";
import { Absence } from "@/entities/absences/types";
import { useUpdateAbsenceMutation } from "@/entities/absences/mutations";
import { toast } from "@cher1shrxd/toast";
import { parseDate } from "@/shared/utils/pare-date";
import { TOAST_ISSUE_DURATION } from "@/shared/constants/toast";
import { useGetAbsenceReason } from "./useGetAbsenceReason";
import { useResolveAbsenceUserIds } from "./useResolveAbsenceUserIds";

export const useUpdateAbsence = (data: Absence) => {
  if (data.absenceId === null) {
    throw new Error("absenceId is required to update an absence.");
  }

  const { options } = useGetAbsenceReason();
  const initType =
    options.find((option) => option.value === `${data.typeId}`) || null;
  const [selectedType, setSelectedType] = useState<DropdownItem | null>(
    initType,
  );
  const [startAt, setStartAt] = useState<Date>(new Date(data.startDate));
  const [endAt, setEndAt] = useState<Date>(new Date(data.endDate));

  const { resolvedUserIds, isResolving } = useResolveAbsenceUserIds(
    data.targetStudents,
  );
  const selectedStudents = resolvedUserIds;
  const [reason, setReason] = useState(data.reason);

  const handleStartAtChange = (date: Date) => {
    setStartAt(date);

    if (date > endAt) {
      setEndAt(date);
    }
  };

  const { mutateAsync, isPending } = useUpdateAbsenceMutation(data.absenceId);

  const submit = async () => {
    if (!selectedType) {
      toast.warning(
        "조건 미충족",
        "결석 사유를 선택해주세요.",
        TOAST_ISSUE_DURATION,
      );
      return;
    }
    if (selectedStudents.length === 0) {
      toast.warning(
        "조건 미충족",
        "결석 학생을 선택해주세요.",
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
    await mutateAsync({
      userIds: selectedStudents,
      startDate: parseDate(startAt),
      endDate: parseDate(endAt),
      reason,
      typeId: Number(selectedType.value),
      checkpoints: data.checkpoints.map((checkpoint) => ({
        checkpointId: checkpoint.checkpointId,
        date: checkpoint.date,
      })),
    });
  };

  const disabled =
    selectedStudents.length === 0 ||
    !selectedType ||
    !reason.trim() ||
    isResolving ||
    isPending;

  return {
    setSelectedType,
    selectedType,
    startAt,
    setStartAt: handleStartAtChange,
    endAt,
    setEndAt,
    options,
    reason,
    setReason,
    submit,
    disabled,
  };
};
