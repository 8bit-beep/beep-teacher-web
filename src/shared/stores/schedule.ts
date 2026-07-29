import { create } from "zustand";

interface State {
  schedules: Record<number, string>;
  setSchedules: (schedules: Record<number, string>) => void;
}

export const useScheduleStore = create<State>((set) => ({
  schedules: { 1: "none", 2: "none", 3: "none" },
  setSchedules: (schedules) => set({ schedules }),
}));
