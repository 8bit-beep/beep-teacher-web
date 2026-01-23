"use client";

import { Absence } from "@/entities/absences/types";
import { useGetAttendTypes } from "@/entities/attend-types/queries";
import { Button, modal } from "@bds-web/ui";
import UpdateAbsenceModal from "./UpdateAbsenceModal";

interface Props {
  data: Absence;
}

const AbsenceItem = ({ data }: Props) => {
  const attendType = useGetAttendTypes().data?.data.find(
    (type) => type.id === data.typeId,
  );

  return (
    <div className="w-full px-2 py-4 h-15 flex items-center gap-2 border-b border-greyscale-20">
      <p className="text-accent mr-4">{attendType?.name}</p>
      <p className="text-body text-greyscale-70">
        {data.isGrouped
          ? `${data.targetStudents[0].name}외 ${data.targetStudents.length - 1}명`
          : data.targetStudents[0].name}
      </p>
      <span className="text-greyscale-40">/</span>
      <p className="text-body text-greyscale-70">
        {data.startDate} ~ {data.endDate}
      </p>
      <div className="flex-1" />
      <Button
        buttonSize="medium"
        buttonType="primary"
        onClick={() =>
          modal.open({
            title: data.isGrouped
              ? `${data.targetStudents[0].name}외 ${data.targetStudents.length - 1}명`
              : data.targetStudents[0].name,
            content: <UpdateAbsenceModal data={data} />,
          })
        }>
        상세 및 수정
      </Button>
    </div>
  );
};

export default AbsenceItem;
