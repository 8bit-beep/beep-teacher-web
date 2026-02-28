import { useGetAttendTypes } from "@/entities/attend-types/queries";
import { Attendance } from "@/entities/attendances/types";
import { useUpdateHistoryMutation } from "@/entities/histories/mutations";
import { DropdownItem } from "@bds-web/ui";
import { useEffect, useState } from "react";

export const useUpdateHistory = (data: Attendance, roomId: number, index: number) => {

  const statuses = useGetAttendTypes().data.data;
  const parseToOptions: DropdownItem[] = statuses.map((status) => ({
    name: status.name,
    value: `${status.id}`,
  }));

  const currentStatus = data.statuses[index]?.status;
  const checkpointId = data.statuses[index]?.checkpoint.id;

  const [status, setStatus] = useState<DropdownItem | null>(
    parseToOptions.find(
      (option) => option.name === `${currentStatus ? currentStatus.name : "미출석"}`,
    ) || null,
  );

  const { mutateAsync } = useUpdateHistoryMutation(roomId, checkpointId);

  const updateStatus = async () => {
    const currentStatus = data.statuses[index]?.status; 
    if (!status || status.name === `${currentStatus ? currentStatus.name : "미출석"}`) return;
    try {
      await mutateAsync({ userId: data.userId, statusId: Number(status.value) });
    } catch {
      setTimeout(() => {
        const currentStatus = data.statuses[index]?.status;  
        setStatus(
          parseToOptions.find(
            (option) => option.name === `${currentStatus ? currentStatus.name : "미출석"}`,
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
