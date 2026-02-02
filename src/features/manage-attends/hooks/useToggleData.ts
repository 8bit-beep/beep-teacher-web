import { useGetAttendancesByRoomId } from "@/entities/attendances/queries";
import { Room } from "@/entities/rooms/types";
import { useRoomStore } from "../stores/room";

export const useToggleData = (data: Room) => {
  const attendances = useGetAttendancesByRoomId(data.id).data.data;
  const { setRoom } = useRoomStore();

  const toggleOpen = () => {
    setRoom(data);
  };

  return {
    attendances,
    toggleOpen,
  };
};
