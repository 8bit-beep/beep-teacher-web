import { DropdownItem } from "@bds-web/ui";
import { create } from "zustand";

interface State {
  checkpoint: DropdownItem | null;
  setCheckpoint: (checkpoint: DropdownItem | null) => void;
}

export const useCheckpointStore = create<State>((set) => ({
  checkpoint: null,
  setCheckpoint: (checkpoint: DropdownItem | null) => set({ checkpoint }),
}));
