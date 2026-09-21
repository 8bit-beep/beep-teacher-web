import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetAllAbsencesQuery } from "@/entities/absences/queries";
import { StudentApi } from "@/entities/students/api";
import { hasOverlappingDateRange } from "@/shared/utils/date-range";

interface DateRange {
  startDate: string;
  endDate: string;
}

const STUDENTS_STALE_TIME = 60 * 1000;

export const useFindRegisteredAbsences = () => {
  const queryClient = useQueryClient();
  const { data: absences } = useGetAllAbsencesQuery();

  return useCallback(
    async (userIds: number[], range: DateRange) => {
      if (!absences || userIds.length === 0) {
        return [];
      }

      const overlappedAbsences = absences.filter((absence) =>
        hasOverlappingDateRange(
          absence.startDate,
          absence.endDate,
          range.startDate,
          range.endDate,
        ),
      );

      if (overlappedAbsences.length === 0) {
        return [];
      }

      const classes = new Map<string, { grade: number; classNumber: number }>();

      overlappedAbsences.forEach((absence) => {
        absence.targetStudents.forEach((student) => {
          if (!student.info) {
            return;
          }

          const { grade, classNumber } = student.info;

          classes.set(`${grade}-${classNumber}`, { grade, classNumber });
        });
      });

      const responses = await Promise.all(
        Array.from(classes.values()).map(({ grade, classNumber }) =>
          queryClient.fetchQuery({
            queryKey: ["students", grade, classNumber],
            queryFn: async () =>
              await StudentApi.getStudentByClass(grade, classNumber),
            staleTime: STUDENTS_STALE_TIME,
          }),
        ),
      );

      const userIdByInfoId = new Map(
        responses
          .flatMap((response) => response.data)
          .filter((student) => userIds.includes(student.id))
          .map((student) => [student.studentInfo.id, student.id] as const),
      );

      return overlappedAbsences
        .map((absence) => {
          const matchedStudents = absence.targetStudents.filter(
            (student) => student.info && userIdByInfoId.has(student.info.id),
          );

          return {
            absence,
            studentNames: matchedStudents.map((student) => student.name),
            userIds: matchedStudents.map(
              (student) => userIdByInfoId.get(student.info.id)!,
            ),
          };
        })
        .filter(({ userIds: matchedUserIds }) => matchedUserIds.length > 0);
    },
    [absences, queryClient],
  );
};
