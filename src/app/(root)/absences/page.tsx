import CreateAbsence from "@/features/manageAbsences/ui/CreateAbsence";
import DashboardIcon from "@/shared/icons/DashboardIcon";
import Section from "@/widgets/section/ui/Section";

export default function AbsencesPage() {
  return (
    <div className="w-full h-full flex flex-col gap-4.5">
      <div className="w-full flex items-center justify-between">
        <CreateAbsence />
      </div>
      <Section
        title="결석자 관리"
        description="학생들의 결석 여부를 관리하세요!"
        icon={<DashboardIcon size={24} />}
        headerOptions={<></>}></Section>
    </div>
  );
}
