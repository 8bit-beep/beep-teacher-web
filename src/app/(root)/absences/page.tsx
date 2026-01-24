import { AbsenceApi } from "@/entities/absences/api";
import AbsenceItem from "@/features/manageAbsences/ui/AbsenceItem";
import CreateAbsence from "@/features/manageAbsences/ui/CreateAbsence";
import ManageMemo from "@/features/manageMemo/ui/ManageMemo";
import DashboardIcon from "@/shared/icons/DashboardIcon";
import { SearchParams } from "@/shared/types/search-params";
import Pagination from "@/widgets/pagination/ui/Pagination";
import Section from "@/widgets/section/ui/Section";

export default async function AbsencesPage({
  searchParams,
}: SearchParams<{ page?: string }>) {
  const { page } = await searchParams;
  const { data } = await AbsenceApi.getAbsences(Number(page || "0"));

  return (
    <div className="w-full h-full flex flex-col gap-4.5">
      <div className="w-full hidden items-center justify-between xl:flex">
        <CreateAbsence />
        <ManageMemo />
      </div>
      <Section
        title="결석자 관리"
        description="학생들의 결석 여부를 관리하세요!"
        icon={<DashboardIcon size={24} />}
        headerOptions={
          <div className="xl:hidden">
            <CreateAbsence />
          </div>
        }>
        <div className="px-2 xl:px-10 h-[calc(100%-80px)] overflow-y-scroll">
          {data.totalPages > 0 ? (
            data.content.map((absence) => (
              <AbsenceItem data={absence} key={absence.absenceId} />
            ))
          ) : (
            <div className="w-full flex items-center justify-center py-20 text-greyscale-50">
              결석 정보가 없습니다.
            </div>
          )}
        </div>
        <Pagination
          totalPages={data.totalPages}
          currentPage={Number(page || "0")}
        />
      </Section>
    </div>
  );
}
