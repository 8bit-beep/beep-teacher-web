import { DropdownItem, modal } from "@bds-web/ui";
import { useState } from "react";
import { GRADES } from "@/shared/constants/grade";
import { useScheduleStore } from "@/shared/stores/schedule";

export const useScheduleSelection = () => {
  const { schedules, setSchedules } = useScheduleStore();
  const [selected, setSelected] = useState<Record<number, string>>(schedules);

  const isChanged = GRADES.some(
    (grade) => selected[grade] !== schedules[grade],
  );

  const select = (grade: number, item: DropdownItem | null) => {
    if (!item) return;
    setSelected((prev) => ({ ...prev, [grade]: item.value }));
  };

  const save = () => {
    setSchedules(selected);
    modal.close();
  };

  return { selected, isChanged, select, save };
};
