"use client";

import { useRoomStore } from "@/shared/stores/room";
import ManageAttendance from "./ManageAttendance";

const RenderManageAttendance = () => {
  const { room } = useRoomStore();

  if (!!room) {
    return <ManageAttendance room={room} />;
  } else {
    return null;
  }
};

export default RenderManageAttendance;
