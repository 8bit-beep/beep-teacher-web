import { AttendType } from "@/entities/attend-types/types";
import { Checkpoint } from "@/entities/checkpoints/types";

export interface AttendanceSortMode {
  grade: number;
  checkpoint: Omit<
    Checkpoint,
    "startAt" | "endAt" | "attendanceStartAt" | "attendanceEndAt"
  >;
  type: AttendType | null;
}

export interface AttendanceSortModes {
  date: string;
  modes: AttendanceSortMode[];
}
