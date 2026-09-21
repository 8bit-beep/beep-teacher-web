import { useGetAttendTypes } from "@/entities/attend-types/queries";
import { useUpdateAttendanceStatusBatch } from "@/entities/attendances/mutations";
import { DropdownItem } from "@beep-ds/ui";
import { useState } from "react";

export const useBatchUpdateAttendance = (roomId: number) => {
  const statuses = useGetAttendTypes().data.data;
  const options: DropdownItem[] = statuses.map((status) => ({
    name: status.name,
    value: `${status.id}`,
  }));

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [batchStatus, setBatchStatus] = useState<DropdownItem | null>(null);
  const [prevRoomId, setPrevRoomId] = useState(roomId);
  const { mutateAsync, isPending } = useUpdateAttendanceStatusBatch(roomId);

  if (prevRoomId !== roomId) {
    setPrevRoomId(roomId);
    setSelectedIds([]);
    setBatchStatus(null);
  }

  const toggleSelect = (userId: number) => {
    setSelectedIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  const applyBatch = async () => {
    if (!batchStatus || selectedIds.length === 0) return;

    try {
      await mutateAsync({
        userIds: selectedIds,
        typeId: Number(batchStatus.value),
      });
      setSelectedIds([]);
      setBatchStatus(null);
    } catch {
      return;
    }
  };

  return {
    options,
    selectedIds,
    batchStatus,
    setBatchStatus,
    isPending,
    toggleSelect,
    applyBatch,
  };
};
