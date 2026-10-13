"use client";

import { modal } from "@beep-ds/ui";
import { useGetSortModesQuery } from "@/entities/sort-modes/queries";
import ChevronIcon from "@/shared/icons/ChevronIcon";
import { GRADES } from "@/shared/constants/grade";
import { DEFAULT_SCHEDULE_LABEL } from "../constants/schedule";
import ScheduleModal from "./ScheduleModal";

const ScheduleButton = () => {
  const { data } = useGetSortModesQuery();

  if (!data) return null;

  const modes = data.data.modes;

  const summary = GRADES.map((grade) => {
    const mode = modes.find((m) => m.grade === grade);

    return `${grade} - ${mode?.type?.name ?? mode?.defaultType?.name ?? DEFAULT_SCHEDULE_LABEL}`;
  }).join(" · ");

  const handleOpen = () => {
    modal.open({ title: "학년별 스케줄", content: <ScheduleModal /> });
  };

  return (
    <button
      type="button"
      onClick={handleOpen}
      className="min-h-[31px] px-3 lg:px-7 py-1 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-0.5 bg-static-white border border-blue-light rounded shadow-modal cursor-pointer"
    >
      <span className="text-caption1 text-blue-light whitespace-nowrap">
        학년별 스케줄:
      </span>
      <span className="flex items-center gap-1.5 whitespace-nowrap">
        <span className="text-caption2 text-blue-light">{summary}</span>
        <ChevronIcon size={14} rotate={-90} className="shrink-0 text-blue-light" />
      </span>
    </button>
  );
};

export default ScheduleButton;
