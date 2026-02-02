import { AttendanceApi } from "@/entities/attendances/api";
import FilterClassroom from "@/features/filter/ui/FilterClassroom";
import StudentItem from "@/features/manage-attends/ui/StudentItem";
import ManageMemo from "@/features/manage-memo/ui/ManageMemo";
import DashboardIcon from "@/shared/icons/DashboardIcon";
import { SearchParams } from "@/shared/types/search-params";
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
        title="출석 조회"
        description="학생들의 실 별 출석여부를 조회하세요!"
        icon={<DashboardIcon size={24} />}
        headerOptions={<FilterClassroom />}>
        <div className="flex-1 min-h-0 overflow-y-auto px-2 xl:px-10">
          <div className="w-full pb-30">
            {data.length > 0 ? (
              data.map((attendance, idx, arr) => (
                <StudentItem
                  data={attendance}
                  isLast={idx === arr.length - 1}
                  key={attendance.studentId}
                />
              ))
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
