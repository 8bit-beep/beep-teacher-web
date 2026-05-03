import { useApproveRoom, useCancelApproval } from "@/entities/approvals/mutations";
import { useGetCurrentApprovalByRoomId } from "@/entities/approvals/queries"

export const useApprove = (roomId: number) => {
  const { data } = useGetCurrentApprovalByRoomId(roomId);
  const { mutateAsync: approveRoom } = useApproveRoom(roomId);
  const { mutateAsync: cancelApproval } = useCancelApproval(roomId);

  const toggleApproval = async () => {
    if (data.approved) {
      await cancelApproval();
    } else {
      await approveRoom();
    }
  };

  return {
    isApproved: data.approved,
    toggleApproval,
    teacher: data.approvedTeacherName,
    approvedAt: data.approvedAt,
  }
}
