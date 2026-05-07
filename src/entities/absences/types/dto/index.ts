import { AbsenceCheckpoint } from "..";

export interface AbsenceRequestDto {
  userIds: number[];
  typeId: number;
  reason: string;
  endDate: string;
  startDate: string;
  checkpoints: Omit<AbsenceCheckpoint, "checkpointName">[];
}

export interface AbsenceResponseDto {
  absenceId: number | null;
  skippedUserIds: number[];
}

export interface AbsenceReasonsResponseDto {
  absenceTypes: string[];
}
