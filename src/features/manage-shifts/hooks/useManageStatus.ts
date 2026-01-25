import { useUpdateShiftStatus } from "@/entities/shifts/mutations";
import { ShiftStatus } from "@/entities/shifts/types";

export const useManageStatus = (shiftId: number) => {
  const { mutateAsync } = useUpdateShiftStatus(shiftId);

  const updateStatus = async (status: ShiftStatus) => {
    await mutateAsync(status);
  }

  return {
    updateStatus,
  };
}