import OkIcon from "@/shared/icons/OkIcon";
import Section from "@/widgets/section/ui/Section";
import Table from "@/widgets/table/ui/Table";
import { SearchParams } from "@/shared/types/search-params";
import { ApprovalApi } from "@/entities/approvals/api";
import ManageApprovals from "@/features/manageApprovals/ui/ManageApprovals";
import { parseDatetimeToTime } from "@/shared/utils/parse-datetime-to-time";

export default async function ApprovalsPage({
  searchParams,
}: SearchParams<{ floor?: string }>) {
  const { floor } = await searchParams;
  const { data } = await ApprovalApi.getAllApprovals(floor);

  return (
    <div className="w-full h-full flex flex-col gap-4.5">
      <div className="w-full flex items-center justify-end"></div>
      <Section
        title="출석 조회"
        description="학생들의 실 별 출석여부를 조회하세요!"
        icon={<OkIcon size={24} />}>
        <Table
          header={[
            { title: "실 이름" },
            { title: "승인 시각", width: "140px" },
            { title: "승인 책임자", width: "144px" },
            { title: "승인 여부", width: "196px" },
          ]}
          rows={data.map((approval) => [
            approval.room.name,
            approval.approvedAt ? parseDatetimeToTime(approval.approvedAt) : "-",
            approval.approvedTeacher ? approval.approvedTeacher.username : "-",
            <ManageApprovals data={approval} key={approval.room.id} />,
          ])}
        />
      </Section>
    </div>
  );
}
