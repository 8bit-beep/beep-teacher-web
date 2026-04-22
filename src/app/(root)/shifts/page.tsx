import { ShiftApi } from "@/entities/shifts/api";
import ManageMemo from "@/features/manage-memo/ui/ManageMemo";
import Detail from "@/features/manage-shifts/ui/Detail";
import StatusIndicator from "@/features/manage-shifts/ui/StatusIndicator";
import PersonIcon from "@/shared/icons/PersonIcon";
import { StudentId } from "@/shared/ui/StudentId";
import { pad } from "@/shared/utils/pad";
import Section from "@/widgets/section/ui/Section";
import { Suspense } from "react";
import Table from "@/widgets/table/ui/Table";

export default async function ShiftsPage() {
  const { data } = await ShiftApi.getShifts();

  return (
    <div className="w-full h-full flex flex-col gap-4.5">
      <div className="w-full hidden items-center justify-end xl:flex">
        <Suspense><ManageMemo /></Suspense>
      </div>
      <Section
        title="실 이동 관리"
        description="실 이동 목록을 확인해 보세요!"
        icon={<PersonIcon size={24} />}>
        <div className="w-full flex-1 min-h-0 overflow-y-auto lg:hidden">
          <Table
            header={[
              { title: "학번/이름" },
              { title: "신청보기", width: "150px", align: "right" },
            ]}
            rows={data.map((shift) => [
              <StudentId
                key={shift.id}
                id={`${shift.user.studentInfo?.grade || 0}${shift.user.studentInfo?.classNumber || 0}${pad(shift.user.studentInfo?.num || 0, 2)}`}
                name={shift.user.name}
              />,              
              <Detail data={shift} key={shift.id + 1} />,
            ])}
          />
        </div>
        <div className="w-full flex-1 min-h-0 overflow-y-auto hidden lg:block">
          <Table
            header={[
              { title: "학번/이름", width: "168px" },
              { title: "변경 교시", width: "140px" },
              { title: "이동 내용" },
              { title: "신청 사유", width: "165px" },
            ]}
            rows={data.map((shift) => [
              <StudentId
                key={shift.id}
                id={`${shift.user.studentInfo?.grade || 0}${shift.user.studentInfo?.classNumber || 0}${pad(shift.user.studentInfo?.num || 0, 2)}`}
                name={shift.user.name}
              />,              
              shift.checkpoint.name,
              `${shift.room.name}로 이동`,
              <Detail data={shift} key={shift.id + 1} />,
            ])}
          />
        </div>
      </Section>
    </div>
  );
}
