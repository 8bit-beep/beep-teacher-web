import { AbsenceTargetStudent } from "@/entities/absences/types";
import { StudentApi } from "@/entities/students/api";
import { useEffect, useMemo, useState } from "react";

const getClassKey = (grade: number, classNumber: number) =>
  `${grade}-${classNumber}`;

export const useResolveAbsenceUserIds = (
  targetStudents: AbsenceTargetStudent[],
) => {
  const initialIds = useMemo(
    () =>
      Array.from(
        new Set(
          targetStudents
            .map((student) => student.id)
            .filter((id): id is number => id !== undefined && id !== null),
        ),
      ),
    [targetStudents],
  );
  const [resolvedUserIds, setResolvedUserIds] = useState<number[]>(initialIds);
  const [isResolving, setIsResolving] = useState(initialIds.length === 0);

  useEffect(() => {
    if (initialIds.length > 0) {
      setResolvedUserIds(initialIds);
      setIsResolving(false);
      return;
    }

    const classes = Array.from(
      new Map(
        targetStudents.map((student) => [
          getClassKey(student.info.grade, student.info.classNumber),
          {
            grade: student.info.grade,
            classNumber: student.info.classNumber,
          },
        ]),
      ).values(),
    );

    if (classes.length === 0) {
      setResolvedUserIds([]);
      setIsResolving(false);
      return;
    }

    let cancelled = false;

    const resolve = async () => {
      setIsResolving(true);

      try {
        const responses = await Promise.all(
          classes.map(({ grade, classNumber }) =>
            StudentApi.getStudentByClass(grade, classNumber),
          ),
        );

        if (cancelled) {
          return;
        }

        const studentIdByInfoId = new Map<number, number>();

        responses.forEach((response) => {
          response.data.forEach((student) => {
            studentIdByInfoId.set(student.studentInfo.id, student.id);
          });
        });

        setResolvedUserIds(
          Array.from(
            new Set(
              targetStudents
                .map((student) => studentIdByInfoId.get(student.info.id))
                .filter((id): id is number => id !== undefined),
            ),
          ),
        );
      } finally {
        if (!cancelled) {
          setIsResolving(false);
        }
      }
    };

    void resolve();

    return () => {
      cancelled = true;
    };
  }, [initialIds, targetStudents]);

  return { resolvedUserIds, isResolving };
};
