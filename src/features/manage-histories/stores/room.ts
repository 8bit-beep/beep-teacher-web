import { Room } from "@/entities/rooms/types";
import { create } from "zustand";

interface State {
  openRoomIds: number[];
  toggleRoom: (roomId: number) => void;
}

export const useRoomStore = create<State>((set) => ({
  openRoomIds: [],
  toggleRoom: (roomId) =>
    set((state) => ({
      openRoomIds: state.openRoomIds.includes(roomId)
        ? state.openRoomIds.filter((id) => id !== roomId)
        : [...state.openRoomIds, roomId],
    })),
}));