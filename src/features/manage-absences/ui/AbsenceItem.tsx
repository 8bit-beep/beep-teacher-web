"use client";

import { Absence } from "@/entities/absences/types";
import { useGetAttendTypes } from "@/entities/attend-types/queries";
import { Button, modal } from "@bds-web/ui";
import UpdateAbsenceModal from "./UpdateAbsenceModal";
import { studentLabel } from "@/shared/utils/student-label";


interface Props {
  data: Absence;
}

const AbsenceItem = ({ data }: Props) => {
  const attendType = useGetAttendTypes().data?.data.find(
    (type) => type.id === data.typeId,
  );



  return (
    <div className="w-full px-2 py-2 xl:py-4 h-15 flex flex-col border-b border-greyscale-20">
      <div className="flex items-center gap-2">
        <p className="text-accent mr-4">{attendType?.name}</p>
        <p className="text-body text-greyscale-70 xl:block hidden">
          {studentLabel(data.isGrouped, data.targetStudents)}         
        </p>
        <span className="text-greyscale-40 xl:block hidden">/</span>
        <p className="text-body text-greyscale-70 xl:block hidden">
          {data.startDate} ~ {data.endDate}
        </p>
        <div className="flex-1" />
        <Button
          buttonSize="small"
          buttonType="primary"
          onClick={() =>
            modal.open({
              title: studentLabel(data.isGrouped, data.targetStudents),
              content: <UpdateAbsenceModal data={data} />,
            })
          }>
          상세 및 수정
        </Button>
      </div>
      <div className="xl:hidden flex items-center gap-2">
        <p className="text-caption2 text-greyscale-70">
          {studentLabel(data.isGrouped, data.targetStudents)}         
        </p>
        <span className="text-greyscale-40">/</span>
        <p className="text-caption2 text-greyscale-70">
          {data.startDate} ~ {data.endDate}
        </p>
      </div>
    </div>
  );
};

export default AbsenceItem;
