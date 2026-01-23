import { AbsenceCheckpoint } from "..";

export interface CreateAbsenceDto {
  userIds: number[];
  typeId: number;
  reason: string;
  endDate: string;
  startDate: string;
  checkpoints: Omit<AbsenceCheckpoint, "checkpointName">[];
}

export interface CreateAbsenceResponseDto {
  absenceId: number;
  skippedUserIds: number[];
}