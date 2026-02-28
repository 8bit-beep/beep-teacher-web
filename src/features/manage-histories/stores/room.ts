import { create } from "zustand";

interface State {
  openRoomIds: number[];
  toggleRoom: (roomId: number) => void;
}

export const useHistoryRoomStore = create<State>((set) => ({
  openRoomIds: [],
  toggleRoom: (roomId) =>
    set((state) => ({
      openRoomIds: state.openRoomIds.includes(roomId)
        ? state.openRoomIds.filter((id) => id !== roomId)
        : [...state.openRoomIds, roomId],
    })),
}));