import { useRoomStore } from "../stores/room";
import { useSwipeToClose } from "@/shared/hooks/useSwipeToClose";

export const useRoomClose = () => {
  const { setRoom } = useRoomStore();
  return useSwipeToClose(() => setRoom(null));
};
