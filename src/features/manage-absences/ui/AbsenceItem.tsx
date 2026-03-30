"use client";

import { Absence } from "@/entities/absences/types";
import { Button, modal } from "@bds-web/ui";
import UpdateAbsenceModal from "./UpdateAbsenceModal";

interface Props {
  data: Absence[];
  studentNum?: string;
  studentName?: string;
}

const AbsenceItem = ({ data, studentName, studentNum }: Props) => {
  const displayModalTitle = `${studentNum} ${studentName}`;

  return (
    <div className="w-full px-2 py-2 xl:py-3 flex flex-col border-b border-greyscale-20">
      <div className="hidden items-center gap-2 lg:flex">
        <p className="text-body text-greyscale-40 w-7">{studentNum}</p>
        <p className="text-accent text-greyscale-70">{studentName}</p>
        <div className="flex-1" />
        <Button
          buttonSize="small"
          buttonType="primary"
          onClick={() =>
            modal.open({
              title: displayModalTitle || "",
              content: <UpdateAbsenceModal data={data} />,
            })
          }
        >
          상세 및 수정
        </Button>
      </div>
      <div className="flex items-center gap-2 lg:hidden">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-caption1 text-greyscale-40 w-7">{studentNum}</p>
            <p className="text-body text-black">{studentName}</p>
          </div>
        </div>
        <div className="flex-1" />
        <Button
          buttonSize="small"
          buttonType="primary"
          onClick={() =>
            modal.open({
              title: displayModalTitle || "",
              content: <UpdateAbsenceModal data={data} />,
            })
          }
        >
          상세 및 수정
        </Button>
      </div>
    </div>
  );
};

export default AbsenceItem;
