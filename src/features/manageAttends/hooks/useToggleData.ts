import { useGetAttendancesByRoomId } from "@/entities/attendances/queries";
import { Room } from "@/entities/rooms/types";
import { useState } from "react";

export const useToggleData = (data: Room) => {
  const attendances = useGetAttendancesByRoomId(data.id).data.data.content;
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return {
    attendances,
    isOpen,
    toggleOpen,
  };
};
