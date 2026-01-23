import { useGetCheckpoints } from "@/entities/checkpoints/queries";
import { DropdownItem } from "@bds-web/ui";
import { useState } from "react";

export const useCreateException = () => {
  const [isCreateMode, setIsCreateMode] = useState(false);
  const checkpoints = useGetCheckpoints().data.data;
  const options = checkpoints.map((checkpoint) => ({
    name: checkpoint.name,
    value: `${checkpoint.id}`,
  }));
  const [selectedCheckpoint, setSelectedCheckpoint] =
    useState<DropdownItem | null>(null);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return {
    isCreateMode,
    setIsCreateMode,
    options,
    selectedCheckpoint,
    setSelectedCheckpoint,
    selectedDate,
    setSelectedDate,
  }
};
