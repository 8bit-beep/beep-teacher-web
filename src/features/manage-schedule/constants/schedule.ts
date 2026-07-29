import { DropdownItem } from "@bds-web/ui";

export const GRADES = [1, 2, 3] as const;

export const DEFAULT_SCHEDULE_VALUE = "none";

export const SCHEDULE_OPTIONS: DropdownItem[] = [
  { name: "변경없음", value: DEFAULT_SCHEDULE_VALUE },
  { name: "교실자습", value: "classroom" },
  { name: "나르샤", value: "narsha" },
  { name: "동아리", value: "club" },
  { name: "방과후", value: "afterschool" },
];

export const getScheduleName = (value: string) =>
  SCHEDULE_OPTIONS.find((option) => option.value === value)?.name ?? "변경없음";
