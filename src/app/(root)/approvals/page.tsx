import OkIcon from "@/shared/icons/OkIcon";
import Section from "@/widgets/section/ui/Section";
import Table from "@/widgets/table/ui/Table";
import { SearchParams } from "@/shared/types/search-params";
import { ApprovalApi } from "@/entities/approvals/api";
import ManageApprovals from "@/features/manage-approvals/ui/ManageApprovals";
import { parseDatetimeToTime } from "@/shared/utils/parse-datetime-to-time";
import ManageMemo from "@/features/manage-memo/ui/ManageMemo";
import MobileApprovals from "@/features/manage-approvals/ui/MobileApprovals";

export default async function ApprovalsPage({
  searchParams,
}: SearchParams<{ floor?: string }>) {
  const { floor } = await searchParams;
  const { data } = await ApprovalApi.getAllApprovals(floor);

  return (
    <div className="w-full h-full flex flex-col gap-4.5">
      <div className="w-full hidden items-center justify-end xl:flex">
        <ManageMemo />
      </div>
      <Section
        title="출석 승인 현황"
        description="출석 승인 현황을 확인해 보세요!"
        icon={<OkIcon size={24} />}>
        <div className="w-full flex-1 min-h-0 overflow-y-auto xl:hidden">
          <Table
            header={[
              { title: "실 이름" },
              { title: "승인 시각 · 책임자", width: "140px" },
            ]}
            rows={data.map((approval) => [
              approval.room.name,
              <MobileApprovals
                approvalId={approval.room.id}
                key={approval.room.id}
              />,
            ])}
          />
        </div>
        <div className="w-full flex-1 min-h-0 overflow-y-auto hidden xl:block">
          <Table
            header={[
              { title: "실 이름" },
              { title: "승인 시각", width: "140px" },
              { title: "승인 책임자", width: "144px" },
              { title: "승인 여부", width: "196px" },
            ]}
            rows={data.map((approval) => [
              approval.room.name,
              approval.approvedAt
                ? parseDatetimeToTime(approval.approvedAt)
                : "-",
              approval.approvedTeacher
                ? approval.approvedTeacher.username
                : "-",
              <ManageApprovals data={approval} key={approval.room.id} />,
            ])}
          />
        </div>
      </Section>
    </div>
  );
}
