import { useGetAllCheckpointHistories } from "@/entities/histories/queries";
import { Room } from "@/entities/rooms/types";
import { useDateStore } from "@/features/filter/stores/date";
import { useRoomStore } from "../stores/room";

export const useToggleData = (data: Room) => {
  const { date } = useDateStore();
  const histories = useGetAllCheckpointHistories(data.id, date).data.data;
  const { openRoomIds, toggleRoom } = useRoomStore();

  const isOpen = openRoomIds.includes(data.id);

  const toggle = () => toggleRoom(data.id);

  return {
    histories,
    toggle,
    isOpen,
    date,
  };
};
