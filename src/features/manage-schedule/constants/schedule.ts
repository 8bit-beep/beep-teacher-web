import { DropdownItem } from "@bds-web/ui";
import { DEFAULT_SCHEDULE_VALUE } from "@/shared/stores/schedule";

export const SCHEDULE_OPTIONS: DropdownItem[] = [
  { name: "변경없음", value: DEFAULT_SCHEDULE_VALUE },
  { name: "교실자습", value: "classroom" },
  { name: "나르샤", value: "narsha" },
  { name: "동아리", value: "club" },
  { name: "방과후", value: "afterschool" },
];

export const getScheduleName = (value: string) =>
  SCHEDULE_OPTIONS.find((option) => option.value === value)?.name ?? "변경없음";
