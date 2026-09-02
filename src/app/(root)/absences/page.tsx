import { AbsenceApi } from "@/entities/absences/api";
import CreateAbsence from "@/features/manage-absences/ui/CreateAbsence";
import AbsencesSectionContent from "@/features/manage-absences/ui/AbsencesSectionContent";
import Refresh from "@/features/manage-attends/ui/Refresh";
import ManageMemo from "@/features/manage-memo/ui/ManageMemo";
import { Suspense } from "react";

export default async function AbsencesPage() {
  const firstPage = await AbsenceApi.getAbsences(0, 100);
  const additionalPages =
    firstPage.data.totalPages > 1
      ? await Promise.all(
          Array.from({ length: firstPage.data.totalPages - 1 }, (_, index) =>
            AbsenceApi.getAbsences(index + 1, 100),
          ),
        )
      : [];
  const allAbsences = [
    ...firstPage.data.content,
    ...additionalPages.flatMap((response) => response.data.content),
  ];
  const { data: todayAbsences } = await AbsenceApi.getTodayAbsences();

  return (
    <div className="w-full h-full flex flex-col gap-4.5">
      <div className="w-full hidden items-center justify-between xl:flex">
        <CreateAbsence />
        <div className="flex items-center gap-3">
          <Refresh size="medium" />
          <Suspense><ManageMemo /></Suspense>
        </div>
      </div>
      <AbsencesSectionContent
        todayData={todayAbsences.content}
        allData={allAbsences}
      />
    </div>
  );
}
