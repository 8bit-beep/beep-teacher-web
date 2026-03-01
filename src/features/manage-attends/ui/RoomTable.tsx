import { ApprovalApi } from "@/entities/approvals/api";
import { RoomApi } from "@/entities/rooms/api";
import { parseDatetimeToTime } from "@/shared/utils/parse-datetime-to-time";
import MobileApprovals from "@/features/manage-approvals/ui/MobileApprovals";
import Table from "@/widgets/table/ui/Table";
import RoomItem from "./RoomItem";

interface Props {
  floor?: string;
}

const RoomTable = async ({ floor }: Props) => {
  const { data } = await RoomApi.getRooms(floor === "other" ? null : floor);
  const { data: approvals } = await ApprovalApi.getAllApprovals(floor);

  return (
    <div className="w-full flex-1 min-h-0 flex-col">
      <div className="w-full flex items-center pl-10 pr-10 py-3 bg-blue-light">
        <div className="flex-1 text-left text-static-white text-body xl:text-h4">실 정보</div>
        <div style={{ width: "140px" }} className="text-left text-static-white text-body xl:text-h4">승인 시각</div>
        <div style={{ width: "144px" }} className="text-left text-static-white text-body xl:text-h4">승인 책임자</div>
        <div style={{ width: "196px" }} className="flex justify-end text-static-white text-body xl:text-h4 pr-17">승인 여부</div>
      </div>
        <div className="w-full flex-1 overflow-y-auto">
        {data.length === 0 ? (
          <div className="h-20 flex items-center justify-center text-h4 text-greyscale-40">
            내용이 없습니다.
          </div>
        ) : (
          data.map((room) => {
            const approval = approvals.find((a) => a.room.id === room.id);
            return (
              <RoomItem
                data={room}
                key={room.id}
                approvedAt={approval?.approvedAt ? parseDatetimeToTime(approval.approvedAt) : "-"}
                approvedTeacher={approval?.approvedTeacher?.username ?? "-"}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default RoomTable;