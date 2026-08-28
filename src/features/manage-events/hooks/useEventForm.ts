import { useMemo, useState } from "react";
import { Student } from "@/entities/students/types";
import { EventDetail } from "@/entities/events/types";
import {
  useCreateEventMutation,
  useUpdateEventMutation,
} from "@/entities/events/mutations";
import { pad } from "@/shared/utils/pad";

interface Params {
  date: string;
  detail?: EventDetail;
  onDone: () => void;
}

const toLabel = (student: Student) =>
  `${student.studentInfo.grade}${student.studentInfo.classNumber}${pad(student.studentInfo.num, 2)} ${student.name}`;

export const useEventForm = ({ date, detail, onDone }: Params) => {
  const [name, setName] = useState(detail?.name ?? "");
  const [checkpointIds, setCheckpointIds] = useState<number[]>(
    detail?.checkpoints.map((checkpoint) => checkpoint.id) ?? [],
  );
  const [students, setStudents] = useState<Map<number, string>>(
    () =>
      new Map(
        detail?.students.map((student) => [
          student.userId,
          `${student.studentId} ${student.name}`,
        ]) ?? [],
      ),
  );

  const createEvent = useCreateEventMutation();
  const updateEvent = useUpdateEventMutation(detail?.id ?? 0);
  const isPending = createEvent.isPending || updateEvent.isPending;

  const selectedStudents = useMemo(() => [...students.keys()], [students]);

  const toggleSelected = (studentId: number, student?: Student) => {
    setStudents((prev) => {
      if (prev.has(studentId)) {
        const next = new Map(prev);
        next.delete(studentId);
        return next;
      }

      // 최근에 선택한 학생이 앞에 오도록 한다
      return new Map([
        [studentId, student ? toLabel(student) : `${studentId}`],
        ...prev,
      ]);
    });
  };

  const toggleCheckpoint = (checkpointId: number) => {
    setCheckpointIds((prev) =>
      prev.includes(checkpointId)
        ? prev.filter((id) => id !== checkpointId)
        : [...prev, checkpointId],
    );
  };

  const toggleAllCheckpoints = (allIds: number[]) => {
    setCheckpointIds((prev) => (prev.length === allIds.length ? [] : allIds));
  };

  const disabled =
    !name.trim() ||
    checkpointIds.length === 0 ||
    selectedStudents.length === 0 ||
    isPending;

  const submit = async () => {
    if (disabled) return;

    const request = {
      name: name.trim(),
      date,
      checkpointIds,
      userIds: selectedStudents,
    };

    try {
      if (detail) {
        await updateEvent.mutateAsync(request);
      } else {
        await createEvent.mutateAsync(request);
      }
      onDone();
    } catch {
      // 실패 토스트는 뮤테이션에서 처리한다
    }
  };

  return {
    name,
    setName,
    checkpointIds,
    toggleCheckpoint,
    toggleAllCheckpoints,
    students,
    selectedStudents,
    toggleSelected,
    disabled,
    isPending,
    submit,
  };
};
