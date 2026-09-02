"use client";

import { Button, modal } from "@beep-ds/ui";
import { useGetSortModesQuery } from "@/entities/sort-modes/queries";
import { GRADES } from "@/shared/constants/grade";
import { NO_CHANGE_LABEL } from "../constants/schedule";
import ScheduleModal from "./ScheduleModal";

const ScheduleButton = () => {
  const { data } = useGetSortModesQuery();

  if (!data) return null;

  const modes = data.data.modes;

  const summary = GRADES.map(
    (grade) =>
      `${grade} - ${
        modes.find((mode) => mode.grade === grade)?.type?.name ??
        NO_CHANGE_LABEL
      }`,
  ).join(" · ");

  const handleOpen = () => {
    modal.open({ title: "학년별 스케줄", content: <ScheduleModal /> });
  };

  return (
    <Button
      buttonType="ghost"
      buttonSize="small"
      showIcon
      onClick={handleOpen}
      className="whitespace-nowrap">
      {summary}
    </Button>
  );
};

export default ScheduleButton;
