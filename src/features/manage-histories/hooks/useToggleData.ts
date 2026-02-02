import { useGetHistories } from "@/entities/histories/queries";
import { Room } from "@/entities/rooms/types";
import { useCheckpointStore } from "@/features/filter/stores/checkpoint";
import { useDateStore } from "@/features/filter/stores/date";
import { useRoomStore } from "../stores/room";

export const useToggleData = (data: Room) => {
  const { date } = useDateStore();
  const { checkpoint } = useCheckpointStore();
  const histories = useGetHistories(
    data.id,
    date,
    Number(checkpoint?.value || "1"),
  ).data.data;
  const { setRoom } = useRoomStore();

  const toggleOpen = () => {
    setRoom(data);
  };

  return {
    histories,
    toggleOpen,
    date,
    checkpoint,
  };
};
