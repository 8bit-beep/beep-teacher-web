import { useGetAttendancesByRoomId } from "@/entities/attendances/queries";
import { Room } from "@/entities/rooms/types";
import { useRoomStore } from "@/shared/stores/room";

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
