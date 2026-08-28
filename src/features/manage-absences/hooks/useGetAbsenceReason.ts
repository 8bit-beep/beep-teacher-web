import { useGetAttendTypes } from "@/entities/attend-types/queries";
import { DropdownItem } from "@beep-ds/ui";
import { useMemo } from "react";

const ALLOWED_ATTEND_NAMES = new Set(["외박", "외출"]);

export const useGetAbsenceReason = () => {
  const attendTypes = useGetAttendTypes().data.data.filter((type) =>
    ALLOWED_ATTEND_NAMES.has(type.name),
  );

  const options = useMemo<DropdownItem[]>(
    () =>
      attendTypes.map((type) => ({
        name: type.name,
        value: `${type.id}`,
      })),
    [attendTypes],
  );

  const nameById = useMemo(
    () =>
      new Map(
        attendTypes.map((type) => [type.id, type.name] as const),
      ),
    [attendTypes],
  );

  return {
    options,
    nameById,
  };
};
