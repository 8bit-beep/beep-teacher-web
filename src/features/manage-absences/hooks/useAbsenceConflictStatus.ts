import { useCallback, useMemo } from "react";
import { useGetAllAbsencesQuery } from "@/entities/absences/queries";
import { Student } from "@/entities/students/types";
import { hasOverlappingDateRange } from "@/shared/utils/date-range";
import { useGetAbsenceReason } from "./useGetAbsenceReason";

interface DateRange {
  startDate: string;
  endDate: string;
}

interface Options {
  ownAbsenceIds?: number[];
  requireAll?: boolean;
}

const NO_ABSENCE_IDS: number[] = [];

export const useAbsenceConflictStatus = (
  ranges: DateRange[],
  { ownAbsenceIds = NO_ABSENCE_IDS, requireAll = false }: Options = {},
) => {
  const { nameById } = useGetAbsenceReason();
  const { data: absences } = useGetAllAbsencesQuery();

  const statusNameByInfoId = useMemo(() => {
    const result = new Map<number, string>();

    if (!absences || ranges.length === 0) {
      return result;
    }

    const conflicts = new Map<
      number,
      { rangeIndexes: Set<number>; statusName: string }
    >();

    absences.forEach((absence) => {
      if (
        absence.absenceId !== null &&
        ownAbsenceIds.includes(absence.absenceId)
      ) {
        return;
      }

      const overlappedRangeIndexes = ranges.flatMap((range, index) =>
        hasOverlappingDateRange(
          absence.startDate,
          absence.endDate,
          range.startDate,
          range.endDate,
        )
          ? [index]
          : [],
      );

      if (overlappedRangeIndexes.length === 0) {
        return;
      }

      const statusName = nameById.get(absence.typeId) ?? "외박";

      absence.targetStudents.forEach((student) => {
        const infoId = student.info?.id;

        if (!infoId) {
          return;
        }

        const conflict = conflicts.get(infoId) ?? {
          rangeIndexes: new Set<number>(),
          statusName,
        };

        overlappedRangeIndexes.forEach((index) =>
          conflict.rangeIndexes.add(index),
        );
        conflicts.set(infoId, conflict);
      });
    });

    conflicts.forEach(({ rangeIndexes, statusName }, infoId) => {
      if (!requireAll || rangeIndexes.size === ranges.length) {
        result.set(infoId, statusName);
      }
    });

    return result;
  }, [absences, nameById, ownAbsenceIds, ranges, requireAll]);

  return useCallback(
    (student: Student) => statusNameByInfoId.get(student.studentInfo.id),
    [statusNameByInfoId],
  );
};
