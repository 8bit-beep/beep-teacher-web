import { Room } from "@/entities/rooms/types";
import { create } from "zustand";

interface State {
  room: Room | null;
  setRoom: (room: Room | null) => void;
}

export const useRoomStore = create<State>((set) => ({
  room: null,
  setRoom: (room) => set({ room }),
}));
