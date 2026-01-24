import { parseDate } from "@/shared/utils/pare-date";
import { create } from "zustand";

interface State {
  date: string;
  setDate: (date: string) => void;
}

export const useDateStore = create<State>((set) => ({
  date: parseDate(new Date()),
  setDate: (date: string) => set({ date }),
}));
