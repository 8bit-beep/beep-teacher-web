import { useGetAttendTypes } from "@/entities/attend-types/queries";
import { useUpdateAttendanceStatus } from "@/entities/attendances/mutations";
import { Attendance } from "@/entities/attendances/types";
import { DropdownItem } from "@bds-web/ui";
import { useEffect, useState } from "react";

export const useUpdateAttendance = (data: Attendance, roomId: number) => {
  const statuses = useGetAttendTypes().data.data;
  const parseToOptions: DropdownItem[] = statuses.map((status) => ({
    name: status.name,
    value: `${status.id}`,
  }));
  const [status, setStatus] = useState<DropdownItem | null>(
    parseToOptions.find(
      (option) =>
        option.name ===
        `${data.statuses[0].status ? data.statuses[0].status?.name : "미출석"}`,
    ) || null,
  );
  const { mutateAsync } = useUpdateAttendanceStatus(roomId);

  const updateStatus = async () => {
    if (
      !status ||
      status.name ===
        `${data.statuses[0].status ? data.statuses[0].status?.name : "미출석"}`
    )
      return;
    try {
      await mutateAsync({
        userId: data.userId,
        statusId: Number(status.value),
      });
    } catch {
      setTimeout(() => {
        setStatus(
          parseToOptions.find(
            (option) =>
              option.name ===
              `${data.statuses[0].status ? data.statuses[0].status?.name : "미출석"}`,
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

  return {
    status,
    setStatus,
    options: parseToOptions,
  };
};
