import { useGetAttendTypes } from "@/entities/attend-types/queries";
import { DropdownItem } from "@bds-web/ui";
import { useState } from "react";
import { useSelectStudents } from "./useSelectStudents";
import { Absence, AbsenceCheckpoint } from "@/entities/absences/types";
import { useUpdateAbsenceMutation } from "@/entities/absences/mutations";
import { toast } from "@cher1shrxd/toast";
import { parseDate } from "@/shared/utils/pare-date";
import { TOAST_ISSUE_TIME } from "@/shared/constants/toast";

export const useUpdateAbsence = (data: Absence) => {
  const attendTypes = useGetAttendTypes().data.data;
  const options = attendTypes.map((type) => ({
    name: type.name,
    value: `${type.id}`,
  }));
  const initType =
    options.find((option) => option.value === `${data.typeId}`) || null;
  const [selectedType, setSelectedType] = useState<DropdownItem | null>(
    initType,
  );
  const [startAt, setStartAt] = useState<Date>(new Date(data.startDate));
  const [endAt, setEndAt] = useState<Date>(new Date(data.endDate));

  const initStudents = data.targetStudents.map((student) => student.info.id);

  const { selectedStudents, toggleSelected } = useSelectStudents(initStudents);
  const [phase, setPhase] = useState<"info" | "selectStudents">("info");

  const initExceptions = data.checkpoints.map((checkpoint) => ({
    checkpointId: checkpoint.checkpointId,
    date: checkpoint.date,
  }));

  const [exceptions, setExceptions] =
    useState<Omit<AbsenceCheckpoint, "checkpointName">[]>(initExceptions);
  const [reason, setReason] = useState(data.reason);

  const deleteException = (id: number) => {
    setExceptions((prev) =>
      prev.filter((exception) => exception.checkpointId !== id),
    );
  };

  const createException = (date: string, checkpointId: number) => {
    setExceptions((prev) => [...prev, { checkpointId, date }]);
  };

  const { mutateAsync, isPending } = useUpdateAbsenceMutation(data.absenceId);

  const submit = async () => {
    if (!selectedType) {
      toast.warning(
        "조건 미충족",
        "결석 사유를 선택해주세요.",
        TOAST_ISSUE_TIME,
      );
      return;
    }
    if (selectedStudents.length === 0) {
      toast.warning(
        "조건 미충족",
        "결석 학생을 선택해주세요.",
        TOAST_ISSUE_TIME,
      );
      return;
    }
    if (!reason.trim()) {
      toast.warning(
        "조건 미충족",
        "상세 결석 사유를 작성해주세요.",
        TOAST_ISSUE_TIME,
      );
      return;
    }
    await mutateAsync({
      userIds: selectedStudents,
      startDate: parseDate(startAt),
      endDate: parseDate(endAt),
      reason,
      typeId: Number(selectedType.value),
      checkpoints: exceptions,
    });
  };

  const disabled =
    selectedStudents.length === 0 ||
    !selectedType ||
    !reason.trim() ||
    isPending;

  return {
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
    exceptions,
    deleteException,
    createException,
    options,
    reason,
    setReason,
    submit,
    disabled,
  };
};
