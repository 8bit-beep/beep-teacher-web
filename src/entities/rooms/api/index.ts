import api from "@/shared/libs/api";
import { Room } from "../types";

export const RoomApi = {
  getRooms: async (floor?: string) => {
    const { data } = await api.get<Room[]>("/rooms");
    return { data: data.filter((room) => room.floor === Number(floor || "1")) };
  },
};
