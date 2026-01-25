import { ShiftApi } from "@/entities/shifts/api";
import ManageMemo from "@/features/manage-memo/ui/ManageMemo";
import Detail from "@/features/manage-shifts/ui/Detail";
import ManageStatus from "@/features/manage-shifts/ui/ManageStatus";
import StatusIndicator from "@/features/manage-shifts/ui/StatusIndicator";
import PersonIcon from "@/shared/icons/PersonIcon";
import { pad } from "@/shared/utils/pad";
import Section from "@/widgets/section/ui/Section";
import Table from "@/widgets/table/ui/Table";

export default async function ShiftsPage() {
  const { data } = await ShiftApi.getShifts();

  return (
    <div className="w-full h-full flex flex-col gap-4.5">
      <div className="w-full hidden items-center justify-end xl:flex">
        <ManageMemo />
      </div>
      <Section
        title="실 이동 관리"
        description="실 이동 목록을 확인해 보세요!"
        icon={<PersonIcon size={24} />}>
        <div className="w-full flex-1 min-h-0 overflow-y-auto xl:hidden">
          <Table
            header={[
              { title: "학번", width: "64px" },
              { title: "이름", width: "84px" },
              { title: "" },
              { title: "신청보기", width: "120px" },
            ]}
            rows={data.map((shift) => [
              `${shift.user.studentInfo?.grade || 0}${pad(shift.user.studentInfo?.classNumber || 0, 2)}${shift.user.studentInfo?.num || 0}`,
              shift.user.username,
              "",
              <StatusIndicator data={shift} key={shift.id} />,
            ])}
          />
        </div>
        <div className="w-full flex-1 min-h-0 overflow-y-auto hidden xl:block">
          <Table
            header={[
              { title: "학번", width: "124px" },
              { title: "이름", width: "84px" },
              { title: "변경 교시", width: "140px" },
              { title: "이동 내용", width: "196px" },
              { title: "신청 사유" },
              { title: "승인 / 거절", width: "167px" },
            ]}
            rows={data.map((shift) => [
              `${shift.user.studentInfo?.grade || 0}${pad(shift.user.studentInfo?.classNumber || 0, 2)}${shift.user.studentInfo?.num || 0}`,
              shift.user.username,
              shift.checkpoint.name,
              `${shift.room.name}로 이동`,
              <Detail data={shift} key={shift.id + 1} />,
              <ManageStatus data={shift} key={shift.id} />,
            ])}
          />
        </div>
      </Section>
    </div>
  );
}
