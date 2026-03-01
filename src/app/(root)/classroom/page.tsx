import { AttendanceApi } from "@/entities/attendances/api";
import FilterClassroom from "@/features/filter/ui/FilterClassroom";
import ClassroomDropdown from "@/features/manage-classroom/ui/ClassroomDropdown";
import ManageMemo from "@/features/manage-memo/ui/ManageMemo";
import DashboardIcon from "@/shared/icons/DashboardIcon";
import { SearchParams } from "@/shared/types/search-params";
import { parseDate } from "@/shared/utils/pare-date";
import Section from "@/widgets/section/ui/Section";
import Table from "@/widgets/table/ui/Table";

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
        <div className="w-full flex-1 min-h-0 overflow-y-auto">
          <Table
            header={[
              { title: "학번/이름" },
              { title: "8~9교시", width: "196px" },
              { title: "10~11교시", width: "196px" },
              { title: "최종", width: "220px" },
            ]}
            rows={data.map((attendance) => [
              <div className="flex gap-4">
                <p className="text-body text-greyscale-40">{attendance.studentId}</p>
                <p className="text-accent text-static-black">{attendance.username}</p>
              </div>,
              ...attendance.statuses.map((statusItem, statusIndex) => (
                <div key={statusItem.checkpoint.id} className="pl-4">
                    <ClassroomDropdown
                      data={attendance}
                      statusIndex={statusIndex}
                    />
                </div>
              )),
            ])}/>
        </div>
      </Section>
    </div>
  );
}
