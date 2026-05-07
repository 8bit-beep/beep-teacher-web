import { Room } from "@/entities/rooms/types";

export interface Approval {
  room: Room;
  approved: boolean;
  approvedTeacher: {
    id: number;
    name: string;
  } | null;
  approvedAt: string | null;
}
