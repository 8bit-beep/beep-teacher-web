import { StudentInfo } from "@/entities/students/types";

export interface Absence {
  absenceId: number;
  isGrouped: boolean;
  targetStudents: AbsenceTargetStudent[];
  startDate: string;
  endDate: string;
  checkpoints: AbsenceCheckpoint[];
  reason: string;
  typeId: number;
}

export interface AbsenceCheckpoint {
  checkpointId: number;
  checkpointName: string;
  date: string;
}

export interface AbsenceTargetStudent {
  name: string;
  info: StudentInfo;
}
