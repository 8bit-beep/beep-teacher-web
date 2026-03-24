import api from "@/shared/libs/api";
import { DEFAULT_FLOOR_VALUE } from "@/features/filter/constants/floor";
import { Room } from "../types";

export const RoomApi = {
  getRooms: async (floor?: string | null) => {
    const { data } = await api.get<Room[]>("/rooms");
    return {
      data:
        floor || floor === undefined
          ? data.filter(
              (room) => room.floor === Number(floor || DEFAULT_FLOOR_VALUE),
            )
          : floor === null
            ? data.filter((room) => room.floor === null)
            : data,
    };
  },
};
