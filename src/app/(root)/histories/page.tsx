import { RoomApi } from "@/entities/rooms/api";
import Download from "@/features/download/ui/Download";
import FilterHistory from "@/features/filter/ui/FilterHistory";
import FilterHistoryDateTime from "@/features/filter/ui/FilterHistoryDateTime";
import HistoriesDropdownTable from "@/features/manage-histories/ui/HistoriesDropdownTable";
import Refresh from "@/features/manage-attends/ui/Refresh";
import ManageMemo from "@/features/manage-memo/ui/ManageMemo";
import HistoryIcon from "@/shared/icons/HistoryIcon";
import { SearchParams } from "@/shared/types/search-params";
import Section from "@/widgets/section/ui/Section";
import { Suspense } from "react";

export default async function HistoriesPage({
  searchParams,
}: SearchParams<{ floor?: string }>) {
  const { floor } = await searchParams;
  const { data } = await RoomApi.getRooms(
    floor === "other" ? null : floor,
  );

  return (
    <div className="w-full h-full flex flex-col gap-4.5">
      <div className="w-full hidden items-center justify-between gap-4 xl:flex">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-4">
            <FilterHistory param={floor ? Number(floor) : undefined} />
            <FilterHistoryDateTime />
          </div>
          <Refresh size="medium" />
        </div>
        <Suspense><ManageMemo /></Suspense>
      </div>
      <Section
        title="출석 기록 조회"
        description="출석 기록을 조회하고 다운로드하세요!"
        icon={<HistoryIcon size={24} />}
        headerOptions={
          <Download />
        }
        mobileFilter={
          <div className="w-full flex flex-col gap-2">
            <div className="flex w-full items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <FilterHistory />
              </div>
              <Refresh size="medium" />
            </div>
            <FilterHistoryDateTime />
          </div>
        }
      >
        <div className="flex-1 min-h-0 overflow-y-auto px-2 xl:px-10">
          <HistoriesDropdownTable data={data} />
        </div>
      </Section>
    </div>
  );
}
