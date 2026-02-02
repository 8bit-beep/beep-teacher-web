"use client";

import { Attendance } from "@/entities/attendances/types";
import { Dropdown } from "@bds-web/ui";
import { useUpdatePreAttendance } from "../hooks/useUpdatePreAttendance";

interface Props {
  data: Attendance;
}

const ManageOneDayAbsenceModal = ({ data }: Props) => {
  const { currentStatuses, selectedStatuses, parseToOptions, handleStatusChange } = useUpdatePreAttendance(data);

  return (
    <div className="w-full flex flex-col gap-4">
      {currentStatuses.map((status, index) => (
        <div
          className="w-full flex flex-col gap-2"
          key={status.checkpoint.value}>
          <span className="text-caption1">{status.checkpoint.name}</span>
          <Dropdown
            selected={selectedStatuses[index]}
            onSelect={(value) => handleStatusChange(index, value)}
            options={parseToOptions}
            dropdownSize="medium"
          />
        </div>
      ))}
    </div>
  );
};

export default ManageOneDayAbsenceModal;
