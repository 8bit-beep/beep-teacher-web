import FilterRoom from "@/features/filter/ui/FilterRoom";
import Refresh from "@/features/manage-attends/ui/Refresh";
import RenderManageAttendance from "@/features/manage-attends/ui/RenderManageAttendance";
import RoomTable from "@/features/manage-attends/ui/RoomTable";
import ManageMemo from "@/features/manage-memo/ui/ManageMemo";
import LabIcon from "@/shared/icons/LabIcon";
import { SearchParams } from "@/shared/types/search-params";
import Section from "@/widgets/section/ui/Section";
import { Suspense } from "react";

export default async function HomePage({
  searchParams,
}: SearchParams<{ floor?: string }>) {
  const { floor } = await searchParams;

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