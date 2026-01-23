import { useGetAttendTypes } from "@/entities/attend-types/queries";
import { DropdownItem } from "@bds-web/ui";
import { useState } from "react";
import { useSelectStudents } from "./useSelectStudents";
import { AbsenceCheckpoint } from "@/entities/absences/types";
import { parseDate } from "@/shared/utils/pare-date";
import { toast } from "@cher1shrxd/toast";
import { useCreateAbsenceMutation } from "@/entities/absences/mutations";

export const useCreateAbsence = () => {
  const attendTypes = useGetAttendTypes().data.data;
  const options = attendTypes.map((type) => ({
    name: type.name,
    value: `${type.id}`,
  }));
  const [selectedType, setSelectedType] = useState<DropdownItem | null>(null);
  const [startAt, setStartAt] = useState<Date>(new Date());
  const [endAt, setEndAt] = useState<Date>(new Date());
  const { selectedStudents, toggleSelected } = useSelectStudents();
  const [phase, setPhase] = useState<"info" | "selectStudents">("info");
  const [exceptions, setExceptions] = useState<
    Omit<AbsenceCheckpoint, "checkpointName">[]
  >([]);
  const [reason, setReason] = useState("");

  const deleteException = (id: number) => {
    setExceptions((prev) =>
      prev.filter((exception) => exception.checkpointId !== id),
    );
  };

  const createException = (date: string, checkpointId: number) => {
    setExceptions((prev) => [...prev, { checkpointId, date }]);
  };

  const { mutateAsync } = useCreateAbsenceMutation();

  const submit = async () => {
    if (!selectedType) {
      toast.warning("조건 미충족", "결석 사유를 선택해주세요.");
      return;
    }
    if (selectedStudents.length === 0) {
      toast.warning("조건 미충족", "결석 학생을 선택해주세요.");
      return;
    }
    if (!reason.trim()) {
      toast.warning("조건 미충족", "상세 결석 사유를 작성해주세요.");
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
    selectedStudents.length === 0 || !selectedType || !reason.trim();

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
