import { AttendType } from "@/entities/attend-types/types";
import { Checkpoint } from "@/entities/checkpoints/types";

export interface Attendance {
  userId: number;
  studentId: string;
  username: string;
  statuses: AttendanceStatus[];
}

interface AttendanceStatus {
  checkpoint: Omit<Checkpoint, "startAt" | "endAt" | "attendanceStartAt" | "attendanceEndAt">;
  status: AttendType | null;
}