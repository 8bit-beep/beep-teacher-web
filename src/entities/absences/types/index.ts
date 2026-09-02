import { StudentInfo } from "@/entities/students/types";

export interface Absence {
  absenceId: number | null;
  source: "ABSENCE" | "ATTENDANCE";
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
  id?: number;
  name: string;
  info: StudentInfo;
}
