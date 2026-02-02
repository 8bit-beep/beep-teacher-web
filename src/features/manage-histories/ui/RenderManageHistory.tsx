"use client";

import { useRoomStore } from "../stores/room";
import ManageHistory from "./ManageHistory";

const RenderManageHistory = () => {
  const { room } = useRoomStore();

  if (!!room) {
    return <ManageHistory room={room} />;
  } else {
    return null;
  }
};

export default RenderManageHistory;
