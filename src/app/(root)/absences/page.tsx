import { AbsenceApi } from "@/entities/absences/api";
import AbsencesDropdownTable from "@/features/manage-absences/ui/AbsencesDropdownTable";
import CreateAbsence from "@/features/manage-absences/ui/CreateAbsence";
import ManageMemo from "@/features/manage-memo/ui/ManageMemo";
import CalendarIcon from "@/shared/icons/CalendarIcon";
import { SearchParams } from "@/shared/types/search-params";
import Pagination from "@/widgets/pagination/ui/Pagination";
import Section from "@/widgets/section/ui/Section";
import { Suspense } from "react";

export default async function AbsencesPage({
  searchParams,
}: SearchParams<{ page?: string }>) {
  const { page } = await searchParams;
  const { data } = await AbsenceApi.getAbsences(Number(page || "0"));

  return (
    <div className="w-full h-full flex flex-col gap-4.5">
      <div className="w-full hidden items-center justify-between xl:flex">
        <CreateAbsence />
        <Suspense><ManageMemo /></Suspense>
      </div>
      <Section
        title="결석자 관리"
        description="학생들의 결석 여부를 관리하세요!"
        icon={<CalendarIcon size={24} />}
        headerOptions={
          <div className="lg:hidden">
            <CreateAbsence />
          </div>
        }>
        <div className="flex-1 min-h-0 overflow-y-auto px-2 xl:px-10">
          <AbsencesDropdownTable data={data.content} />
        </div>
        <Pagination
          totalPages={data.totalPages}
          currentPage={Number(page || "0")}
        />
      </Section>
    </div>
  );
}
