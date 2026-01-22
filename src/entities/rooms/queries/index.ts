import { useSuspenseQuery } from "@tanstack/react-query";
import { RoomApi } from "../api";

export const useGetRooms = () => {
  return useSuspenseQuery({
    queryKey: ["rooms"],
    queryFn: async () => await RoomApi.getRooms(),
  });
};
