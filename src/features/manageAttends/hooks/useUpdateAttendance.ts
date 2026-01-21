import { useGetAttendTypes } from "@/entities/attend-types/queries";
import { DropdownItem } from "@bds-web/ui";
import { useState } from "react";

export const useUpdateAttendance = () => {
  const statuses = useGetAttendTypes().data.data;
  const parseToOptions: DropdownItem[] = statuses.map((status) => ({
    name: status.name,
    value: `${status.id}`,
  }));
  const [status, setStatus] = useState<DropdownItem | null>(parseToOptions[0]);

  return {
    status,
    setStatus,
    options: parseToOptions,
  }
};
