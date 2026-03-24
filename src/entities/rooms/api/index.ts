import api from "@/shared/libs/api";

import { Room } from "../types";

export const RoomApi = {
  getRooms: async (floor?: string | null) => {
    const { data } = await api.get<Room[]>("/rooms");
    return {
      data:
        floor || floor === undefined
          ? data.filter(
              (room) => room.floor === Number(floor || 2),
            )
          : floor === null
            ? data.filter((room) => room.floor === null)
            : data,
    };
  },
};
