import { useGetAttendTypes } from "@/entities/attend-types/queries";
import { Attendance } from "@/entities/attendances/types";
import { useUpdateAttendanceStatusWithCheckpoint } from "@/entities/attendances/mutations";
import { DropdownItem } from "@beep-ds/ui";
import { useEffect, useRef, useState, useMemo } from "react";

export const useUpdateClassroom = (data: Attendance, statusIndex: number) => {
  const statuses = useGetAttendTypes().data.data;

  const options: DropdownItem[] = useMemo(
    () => statuses.map((status) => ({ name: status.name, value: `${status.id}` })),
    [statuses],
  );

  const getStatusFromData = (opts: DropdownItem[] = options) => {
    const name = data.statuses[statusIndex]?.status?.name ?? "미출석";
    return opts.find((option) => option.name === name) || null;
  };

  const [status, setStatus] = useState<DropdownItem | null>(() => getStatusFromData());

  const isUserAction = useRef(false);

  useEffect(() => {
    if (isUserAction.current) {
      isUserAction.current = false;
      return;
    }
    setStatus(getStatusFromData());
  }, [data.statuses[statusIndex]?.status?.name, options]);

  const { mutateAsync } = useUpdateAttendanceStatusWithCheckpoint();
  const checkpointId = data.statuses[statusIndex]?.checkpoint.id;

  const updateStatus = async () => {
    const currentName = data.statuses[statusIndex]?.status?.name ?? "미출석";
    if (!status || status.name === currentName) return;
    try {
      await mutateAsync({ userId: data.userId, statusId: Number(status.value), checkpointId });
    } catch {
      setTimeout(() => setStatus(getStatusFromData()), 100);
    }
  };

  useEffect(() => {
    if (status) updateStatus();
  }, [status]);

  const handleSetStatus = (value: DropdownItem | null) => {
    isUserAction.current = true;
    setStatus(value);
  };

  return { status, setStatus: handleSetStatus, options };
};