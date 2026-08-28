import { Checkpoint } from "@/entities/checkpoints/types";

export interface Event {
  id: number;
  name: string;
  date: string;
  checkpointNames: string[];
  studentCount: number;
  createdByName: string;
}

export interface EventStudent {
  userId: number;
  studentId: string;
  name: string;
}

export interface EventDetail {
  id: number;
  name: string;
  date: string;
  checkpoints: Omit<
    Checkpoint,
    "startAt" | "endAt" | "attendanceStartAt" | "attendanceEndAt"
  >[];
  students: EventStudent[];
  createdByName: string;
}

export interface EventRequestDto {
  name: string;
  date: string;
  checkpointIds: number[];
  userIds: number[];
}
