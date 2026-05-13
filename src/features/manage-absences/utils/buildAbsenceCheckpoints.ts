import { Checkpoint } from "@/entities/checkpoints/types";
import { AbsenceCheckpoint } from "@/entities/absences/types";
import { parseDate } from "@/shared/utils/pare-date";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export const buildAbsenceCheckpoints = (
  startAt: Date,
  endAt: Date,
  checkpoints: Checkpoint[],
): Omit<AbsenceCheckpoint, "checkpointName">[] => {
  const start = new Date(startAt);
  start.setHours(0, 0, 0, 0);

  const end = new Date(endAt);
  end.setHours(0, 0, 0, 0);

  const result: Omit<AbsenceCheckpoint, "checkpointName">[] = [];

  for (let current = new Date(start); current <= end; current = new Date(current.getTime() + DAY_IN_MS)) {
    const date = parseDate(current);

    checkpoints.forEach((checkpoint) => {
      result.push({
        checkpointId: checkpoint.id,
        date,
      });
    });
  }

  return result;
};
