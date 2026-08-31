import { AttendanceApi } from "@/entities/attendances/api";
import FilterClassroom from "@/features/filter/ui/FilterClassroom";
import { getClassroomTableWidths } from "@/shared/constants/tableWidths";
import ClassroomItem from "@/features/manage-classroom/ui/ClassroomItem";
import MobileClassroomItem from "@/features/manage-classroom/ui/MobileClassroomItem";
import Refresh from "@/features/manage-attends/ui/Refresh";
import ManageMemo from "@/features/manage-memo/ui/ManageMemo";
import DashboardIcon from "@/shared/icons/DashboardIcon";
import { SearchParams } from "@/shared/types/search-params";
import {
  isAbsenceStatusName,
  isOutStatusName,
} from "@/shared/utils/attendance-status";
import { parseDate } from "@/shared/utils/pare-date";
import Section from "@/widgets/section/ui/Section";
import Table from "@/widgets/table/ui/Table";
import { Suspense } from "react";

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

  const firstStatuses = data[0]?.statuses ?? [];
  const { dropdownWidth, headerWidth, lastHeaderWidth } = getClassroomTableWidths(firstStatuses.length);
  const desktopStatusHeaders = firstStatuses.map((s, i) => ({
    title: s.checkpoint.name,
    width: i === firstStatuses.length - 1 ? lastHeaderWidth : headerWidth,
  }));
  const mobileStatusHeaders = firstStatuses.map((s) => ({
    title: s.checkpoint.name,
    align: "center" as const,
    width: "33.33vw",
  }));

  return (
    <div className="w-full h-full flex flex-col gap-4.5">
      <div className="w-full hidden items-center justify-end gap-3 xl:flex">
        <Refresh size="medium" />
        <Suspense><ManageMemo /></Suspense>
      </div>
      <Section
        title="반별 조회"
        description="학생들의 반별 출석여부를 조회하세요!"
        icon={<DashboardIcon size={24} />}
        headerOptions={
          <div className="flex items-center gap-3">
            <p className="text-h4 text-greyscale-40">{parseDate(new Date())}</p>
            <div className="hidden lg:block"><Suspense><FilterClassroom /></Suspense></div>
          </div>}
        mobileFilter={
          <div className="lg:hidden">
            <Suspense><FilterClassroom /></Suspense>
          </div>}
        >
        <div className="hidden lg:flex w-full flex-1 min-h-0 overflow-y-auto">
          <Table
            header={[
              { title: "학번/이름" },
              ...desktopStatusHeaders,
            ]}
            rows={data.map((attendance) => {
              const isAbsent = attendance.statuses.some((s) =>
                isAbsenceStatusName(s.status?.name),
              );
              const isOut = attendance.statuses.some((s) =>
                isOutStatusName(s.status?.name),
              );

              return {
                className: isAbsent
                  ? "bg-red-light"
                  : isOut
                    ? "bg-green-light"
                    : undefined,
                cells: ClassroomItem({
                  data: attendance,
                  isHighlighted: isAbsent || isOut,
                  desktopWidth: dropdownWidth,
                }),
              };
            })}
          />
        </div>
        <div className="flex lg:hidden w-full flex-1 min-h-0 overflow-x-auto overflow-y-auto [&_table]:w-auto [&_table]:min-w-full">
          <Table
            bodyScrollable={false}
            header={mobileStatusHeaders}
            rows={data.map((attendance) => {
              const isAbsent = attendance.statuses.some((s) =>
                isAbsenceStatusName(s.status?.name),
              );
              const isOut = attendance.statuses.some((s) =>
                isOutStatusName(s.status?.name),
              );
              const isHighlighted = isAbsent || isOut;

              return {
                className: isAbsent
                  ? "bg-red-light"
                  : isOut
                    ? "bg-green-light"
                    : undefined,
                rowHeader: (
                  <div className="flex gap-2">
                    <p className={`text-accent ${isHighlighted ? "text-greyscale-10" : "text-greyscale-40"}`}>
                      {attendance.studentId}
                    </p>
                    <p className={`text-accent ${isHighlighted ? "text-white" : "text-static-black"}`}>
                      {attendance.name}
                    </p>
                  </div>
                ),
                cells: MobileClassroomItem({ data: attendance }),
              };
            })}
          />
        </div>
      </Section>
    </div>
  );
}
