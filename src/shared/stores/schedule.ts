import { GRADES } from "@/shared/constants/grade";
import { create } from "zustand";

export const DEFAULT_SCHEDULE_VALUE = "none";

interface State {
  schedules: Record<number, string>;
  setSchedules: (schedules: Record<number, string>) => void;
}

export const useScheduleStore = create<State>((set) => ({
  schedules: Object.fromEntries(
    GRADES.map((grade) => [grade, DEFAULT_SCHEDULE_VALUE]),
  ),
  setSchedules: (schedules) => set({ schedules }),
}));
