import { Room } from "@/entities/rooms/types";

export interface Approval {
  room: Room;
  approved: boolean;
  approvedTeacher: {
    id: number;
    username: string;
  } | null;
  approvedAt: string | null;
}
