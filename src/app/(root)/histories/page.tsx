import { RoomApi } from "@/entities/rooms/api";
import Download from "@/features/download/ui/Download";
import FilterHistory from "@/features/filter/ui/FilterHistory";
import FilterHistoryDateTime from "@/features/filter/ui/FilterHistoryDateTime";
import HistoryRoomItem from "@/features/manageHistories/ui/HistoryRoomItem";
import ManageMemo from "@/features/manageMemo/ui/ManageMemo";
import HistoryIcon from "@/shared/icons/HistoryIcon";
import { SearchParams } from "@/shared/types/search-params";
import Section from "@/widgets/section/ui/Section";

export default async function HistoriesPage({
  searchParams,
}: SearchParams<{ floor?: string }>) {
  const { floor } = await searchParams;
  const { data } = await RoomApi.getRooms(floor);

  return (
    <div className="w-full h-full flex flex-col gap-4.5">
      <div className="w-full flex items-center justify-between">
        <FilterHistory param={floor ? Number(floor) : undefined} />
        <ManageMemo />
      </div>
      <Section
        title="출석 기록 조회"
        description="출석 기록을 조회하고 다운로드하세요!"
        icon={<HistoryIcon size={24} />}
        headerOptions={
          <>
            <FilterHistoryDateTime />
            <Download />
          </>
        }>
        <div className="px-10 h-full overflow-y-scroll">
          {data.length > 0 ? (
            data.map((room) => <HistoryRoomItem data={room} key={room.id} />)
          ) : (
            <div className="w-full flex items-center justify-center py-20 text-greyscale-50">
              출석 정보가 없습니다.
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}
