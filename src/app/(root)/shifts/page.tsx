import { ShiftApi } from "@/entities/shifts/api";
import ManageMemo from "@/features/manageMemo/ui/ManageMemo";
import ManageStatus from "@/features/manageShifts/ui/ManageStatus";
import PersonIcon from "@/shared/icons/PersonIcon";
import { pad } from "@/shared/utils/pad";
import Section from "@/widgets/section/ui/Section";
import Table from "@/widgets/table/ui/Table";

export default async function ShiftsPage() {
  const { data } = await ShiftApi.getShifts();

  return (
    <div className="w-full h-full flex flex-col gap-4.5">
      <div className="w-full flex items-center justify-end">
        <ManageMemo />
      </div>
      <Section
        title="출석 조회"
        description="학생들의 실 별 출석여부를 조회하세요!"
        icon={<PersonIcon size={24} />}>
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
            `${shift.user.studentInfo.grade}${pad(shift.user.studentInfo.classNumber, 2)}${shift.user.studentInfo.num}`,
            shift.user.username,
            shift.checkpoint.name,
            `${shift.room.name}로 이동`,
            shift.reason,
            <ManageStatus data={shift} key={shift.id} />,
          ])}
        />
      </Section>
    </div>
  );
}
