"use client";

import { useRoomStore } from "../stores/room";
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
