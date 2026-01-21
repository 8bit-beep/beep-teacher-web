import api from "@/shared/libs/api";
import { Room } from "../types";

export const RoomApi = {
  getRooms: async () => {
    return await api.get<Room[]>("/rooms");
  },

  createRoom: async (data: Omit<Room, "id">) => {
    return await api.post("/rooms", data);
  },

  getRoomById: async (roomId: number) => {
    return await api.get<Room>(`/rooms/${roomId}`);
  },

  updateRoom: async (data: Room) => {
    return await api.patch(`/rooms/${data.id}`, data);
  },

  deleteRoom: async (roomId: number) => {
    return await api.delete(`/rooms/${roomId}`);
  },
};