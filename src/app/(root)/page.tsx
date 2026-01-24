import { RoomApi } from "@/entities/rooms/api";
import FilterRoom from "@/features/filter/ui/FilterRoom";
import Refresh from "@/features/manageAttends/ui/Refresh";
import RoomItem from "@/features/manageAttends/ui/RoomItem";
import ManageMemo from "@/features/manageMemo/ui/ManageMemo";
import LabIcon from "@/shared/icons/LabIcon";
import { SearchParams } from "@/shared/types/search-params";
import Section from "@/widgets/section/ui/Section";

export default async function HomePage({
  searchParams,
}: SearchParams<{ floor?: string }>) {
  const { floor } = await searchParams;
  const { data } = await RoomApi.getRooms(floor);

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
        <div className="px-2 xl:px-10 h-full overflow-y-scroll">
          {data.length > 0 ? (
            data.map((room) => <RoomItem data={room} key={room.id} />)
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
