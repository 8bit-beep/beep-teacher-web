import { useGetHistories } from "@/entities/histories/queries";
import { Room } from "@/entities/rooms/types";
import { useCheckpointStore } from "@/features/filter/stores/checkpoint";
import { useDateStore } from "@/features/filter/stores/date";
import { useState } from "react";

export const useToggleData = (data: Room) => {
  const { date } = useDateStore();
  const { checkpoint } = useCheckpointStore();
  const histories = useGetHistories(
    data.id,
    date,
    Number(checkpoint?.value || "1"),
  ).data.data;
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return {
    histories,
    isOpen,
    toggleOpen,
    date,
    checkpoint,
  };
};
