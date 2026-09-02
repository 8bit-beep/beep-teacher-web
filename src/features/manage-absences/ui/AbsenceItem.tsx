"use client";

import { Absence } from "@/entities/absences/types";
import { Button, modal } from "@beep-ds/ui";
import UpdateAbsenceModal from "./UpdateAbsenceModal";

interface Props {
  data: Absence[];
  studentNum?: string;
  studentName?: string;
}

const MAX_VISIBLE_PERIODS = 2;

const buildPeriodLabel = (absences: Absence[]) => {
  const periods = [...absences]
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .map((absence) => `${absence.startDate} ~ ${absence.endDate}`);

  if (periods.length === 0) {
    return "";
  }

  const visible = periods.slice(0, MAX_VISIBLE_PERIODS).join(", ");

  return periods.length > MAX_VISIBLE_PERIODS ? `${visible} …` : visible;
};

const AbsenceItem = ({ data, studentName, studentNum }: Props) => {
  const displayModalTitle = `${studentNum} ${studentName}`;
  const periodLabel = buildPeriodLabel(data);

  const openDetail = () =>
    modal.open({
      title: displayModalTitle || "",
      content: <UpdateAbsenceModal data={data} />,
    });

  return (
    <div className="w-full px-2 py-2 xl:py-3 flex flex-col border-b border-greyscale-20">
      <div className="hidden items-center gap-2 lg:flex">
        <p className="text-body text-greyscale-40 min-w-10 shrink-0 tabular-nums">
          {studentNum}
        </p>
        <p className="text-accent text-greyscale-70 min-w-0 truncate">
          {periodLabel ? `${studentName} / ${periodLabel}` : studentName}
        </p>
        <div className="flex-1" />
        <Button
          buttonSize="small"
          buttonType="primary"
          className="shrink-0"
          onClick={openDetail}
        >
          상세 및 수정
        </Button>
      </div>
      <div className="flex items-center gap-2 lg:hidden">
        <div className="min-w-0 flex flex-col">
          <div className="flex items-center gap-2">
            <p className="text-caption1 text-greyscale-40 min-w-9 shrink-0 tabular-nums">
              {studentNum}
            </p>
            <p className="text-body text-black">{studentName}</p>
          </div>
          {periodLabel && (
            <p className="text-caption2 text-greyscale-40 truncate">
              {periodLabel}
            </p>
          )}
        </div>
        <div className="flex-1" />
        <Button
          buttonSize="small"
          buttonType="primary"
          className="shrink-0"
          onClick={openDetail}
        >
          상세 및 수정
        </Button>
      </div>
    </div>
  );
};

export default AbsenceItem;
