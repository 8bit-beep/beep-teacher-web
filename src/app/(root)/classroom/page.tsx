import { AttendanceApi } from "@/entities/attendances/api";
import FilterClassroom from "@/features/filter/ui/FilterClassroom";
import ClassroomTable from "@/features/manage-classroom/ui/ClassroomTable";
import ManageMemo from "@/features/manage-memo/ui/ManageMemo";
import DashboardIcon from "@/shared/icons/DashboardIcon";
import { SearchParams } from "@/shared/types/search-params";
import { parseDate } from "@/shared/utils/pare-date";
import Section from "@/widgets/section/ui/Section";

export default async function ClassroomPage({
  searchParams,
}: SearchParams<{ classroom?: string }>) {
  const { classroom } = await searchParams;
  const [gradeStr, classNumberStr] = classroom ? classroom.split("-") : [];
  const grade = gradeStr ? Number(gradeStr) : 1;
  const classNumber = classNumberStr ? Number(classNumberStr) : 1;
  const { data } = await AttendanceApi.getAttendancesByClassroom(
    grade,
    classNumber,
  );

  return (
    <div className="w-full h-full flex flex-col gap-4.5">
      <div className="w-full hidden items-center justify-end xl:flex">
        <ManageMemo />
      </div>
      <Section
        title="반별 조회"
        description="학생들의 반별 출석여부를 조회하세요!"
        icon={<DashboardIcon size={24} />}
        headerOptions={
          <div className="flex items-center gap-3">
            <p className="text-body text-greyscale-40">{parseDate(new Date())}</p>
            <FilterClassroom />
          </div>
        }>
        <div className="flex-1 min-h-0 overflow-y-auto px-2 xl:px-10">
          <div className="w-full pb-30">
            {data.length > 0 ? (
              <ClassroomTable data={data} />
            ) : (
              <div className="w-full flex items-center justify-center py-20 text-greyscale-50">
                학생 정보가 없습니다.
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}
