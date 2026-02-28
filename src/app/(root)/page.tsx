import { RoomApi } from "@/entities/rooms/api";
import { ApprovalApi } from "@/entities/approvals/api";
import FilterRoom from "@/features/filter/ui/FilterRoom";
import Refresh from "@/features/manage-attends/ui/Refresh";
import RenderManageAttendance from "@/features/manage-attends/ui/RenderManageAttendance";
import RoomTable from "@/features/manage-attends/ui/RoomTable";
import MobileApprovals from "@/features/manage-approvals/ui/MobileApprovals";
import ManageMemo from "@/features/manage-memo/ui/ManageMemo";
import LabIcon from "@/shared/icons/LabIcon";
import { SearchParams } from "@/shared/types/search-params";
import { parseDatetimeToTime } from "@/shared/utils/parse-datetime-to-time";
import Section from "@/widgets/section/ui/Section";
import Table from "@/widgets/table/ui/Table";
import { Suspense } from "react";

export default async function HomePage({
  searchParams,
}: SearchParams<{ floor?: string }>) {
  const { floor } = await searchParams;
  const { data: approvals } = await ApprovalApi.getAllApprovals(floor);

  return (
    <div className="w-full h-full flex flex-col gap-4.5">
      <div className="w-full hidden items-center justify-between xl:flex">
        <FilterRoom param={floor ? Number(floor) : undefined} />
        <ManageMemo />
      </div>
      <Section
        title="출석 조회"
        description="학생들의 실 별 출석여부를 조회하세요!"
        icon={<LabIcon size={24} />}
        headerOptions={<Refresh />}
        mobileFilter={<FilterRoom param={floor ? Number(floor) : undefined} />}>

        <div className="w-full flex-1 min-h-0 flex flex-col xl:hidden">
          <Table
            header={[
              { title: "실 이름" },
              { title: "승인 시각 · 책임자", width: "140px" },
            ]}
            rows={approvals.map((approval) => [
              approval.room.name,
              <MobileApprovals
                approvalId={approval.room.id}
                key={approval.room.id}
              />,
            ])}
          />
        </div>

        <Suspense
          fallback={
            <div className="w-full flex items-center justify-center py-20 text-greyscale-50">
              불러오는 중...
            </div>
          }>
          <RoomTable floor={floor} />
        </Suspense>

      </Section>
      <RenderManageAttendance />
    </div>
  );
}