import { useGetAttendTypes } from "@/entities/attend-types/queries";
import { Attendance } from "@/entities/attendances/types";
import { useUpdateAttendanceStatusWithCheckpoint } from "@/entities/attendances/mutations";
import { DropdownItem } from "@bds-web/ui";
import { useEffect, useState } from "react";

export const useUpdateClassroom = (data: Attendance, statusIndex: number) => {
  const statuses = useGetAttendTypes().data.data;
  const options: DropdownItem[] = statuses.map((status) => ({
    name: status.name,
    value: `${status.id}`,
  }));

  const currentStatus = data.statuses[statusIndex]?.status;
  const checkpointId = data.statuses[statusIndex]?.checkpoint.id;

  const [status, setStatus] = useState<DropdownItem | null>(
    options.find(
      (option) => option.name === (currentStatus ? currentStatus.name : "미출석"),
    ) || null,
  );

  const { mutateAsync } = useUpdateAttendanceStatusWithCheckpoint();

  const updateStatus = async () => {
    if (!status || status.name === (currentStatus ? currentStatus.name : "미출석")) return;
    try {
      await mutateAsync({ userId: data.userId, statusId: Number(status.value), checkpointId });
    } catch {
      setTimeout(() => {
        setStatus(
          options.find(
            (option) => option.name === (currentStatus ? currentStatus.name : "미출석"),
          ) || null,
        );
      }, 100);
    }
  };

  useEffect(() => {
    if (status) {
      updateStatus();
    }
  }, [status]);

  return { status, setStatus, options };
};
