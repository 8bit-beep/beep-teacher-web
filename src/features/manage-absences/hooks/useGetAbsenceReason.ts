import { useGetAllAbsencesReason } from "@/entities/absences/queries";
import { ABSENCE_REASON_LABEL } from "@/entities/absences/constants/reason";
import { DropdownItem } from "@bds-web/ui";
import { useMemo } from "react";

const toAbsenceReasonLabel = (code: string) =>
  ABSENCE_REASON_LABEL[code as keyof typeof ABSENCE_REASON_LABEL] ?? code;

export const useGetAbsenceReason = () => {
  const absenceTypes = useGetAllAbsencesReason().data.data.absenceTypes;

  const options = useMemo<DropdownItem[]>(
    () =>
      absenceTypes.map((absenceType, index) => ({
        name: toAbsenceReasonLabel(absenceType),
        value: `${index}`,
      })),
    [absenceTypes],
  );

  const nameById = useMemo(
    () =>
      new Map(
        absenceTypes.map(
          (absenceType, index) =>
            [index, toAbsenceReasonLabel(absenceType)] as const,
        ),
      ),
    [absenceTypes],
  );

  return {
    options,
    nameById,
  };
};
