"use client";

import { useRoomStore } from "@/shared/stores/room";
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
