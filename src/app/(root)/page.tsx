import { DUMMY_ROOM } from "@/entities/rooms/constants/dummy";
import FilterRoom from "@/features/filter/ui/FilterRoom";
import Refresh from "@/features/manageAttends/ui/Refresh";
import RoomItem from "@/features/manageAttends/ui/RoomItem";
import LabIcon from "@/shared/icons/LabIcon";
import Section from "@/widgets/section/ui/Section";

export default function HomePage() {
  const data = [DUMMY_ROOM, DUMMY_ROOM, DUMMY_ROOM, DUMMY_ROOM];

  return (
    <div className="w-full h-full flex flex-col gap-4.5">
      <div className="w-full flex items-center justify-between">
        <FilterRoom />
      </div>
      <Section
        title="출석 조회"
        description="학생들의 실 별 출석여부를 조회하세요!"
        icon={<LabIcon size={24} />}
        headerOptions={<Refresh />}>
        <div className="px-10 h-full">
          {data.map((room, index) => (
            <RoomItem data={room} key={index} />
          ))}
        </div>
      </Section>
    </div>
  );
}
