"use client";

import { Button, modal } from "@bds-web/ui";
import { GRADES } from "@/shared/constants/grade";
import { useScheduleStore } from "@/shared/stores/schedule";
import { getScheduleName } from "../constants/schedule";
import ScheduleModal from "./ScheduleModal";

const ScheduleButton = () => {
  const schedules = useScheduleStore((state) => state.schedules);

  const summary = GRADES.map(
    (grade) => `${grade} - ${getScheduleName(schedules[grade])}`,
  ).join(" · ");

  const handleOpen = () => {
    modal.open({ title: "학년별 스케줄", content: <ScheduleModal /> });
  };

  return (
    <Button buttonType="ghost" buttonSize="small" showIcon onClick={handleOpen}>
      {summary}
    </Button>
  );
};

export default ScheduleButton;
