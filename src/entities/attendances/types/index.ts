import { AttendType } from "@/entities/attend-types/types";
import { Checkpoint } from "@/entities/checkpoints/types";

export interface Attendance {
  userId: number;
  studentId: string;
  name: string;
  statuses: AttendanceStatus[];
  isLate: boolean;
}

export interface AttendanceStatus {
  checkpoint: Omit<Checkpoint, "startAt" | "endAt" | "attendanceStartAt" | "attendanceEndAt">;
  status: AttendType | null;
}
