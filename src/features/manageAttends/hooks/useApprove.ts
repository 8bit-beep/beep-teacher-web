import { useApproveRoom, useCancelApproval } from "@/entities/approvals/mutations";
import { useGetCurrentApprovalByRoomId } from "@/entities/approvals/queries"

export const useApprove = (roomId: number) => {
  const { data: isApproved } = useGetCurrentApprovalByRoomId(roomId);
  const { mutateAsync: approveRoom } = useApproveRoom(roomId);
  const { mutateAsync: cancelApproval } = useCancelApproval(roomId);

  const toggleApproval = async () => {
    if (isApproved) {
      await cancelApproval();
    } else {
      await approveRoom();
    }
  };

  return {
    isApproved,
    toggleApproval,
  }
}