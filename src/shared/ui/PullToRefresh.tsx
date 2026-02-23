"use client";

import { PropsWithChildren } from "react";
import { colors } from "@bds-web/colors";
import { usePullToRefresh } from "../hooks/usePullToRefresh";

const PullToRefresh = ({ children }: PropsWithChildren) => {
  const pullToRefresh = usePullToRefresh();

  return (
    <div
      className="w-full h-full"
      onTouchStart={pullToRefresh.handlers.handleTouchStart}
      onMouseDown={pullToRefresh.handlers.handleMouseDown}
      onMouseMove={pullToRefresh.handlers.handleMouseMove}
      onMouseUp={pullToRefresh.handlers.handleMouseUp}
      onMouseLeave={pullToRefresh.handlers.handleMouseUp}
      onTouchEnd={pullToRefresh.handlers.handleEnd}
    >
      <div
        className="w-full flex justify-center items-center h-0 overflow-hidden bg-static-white"
        ref={pullToRefresh.refreshRef}
      >
        <div className="w-6 h-6 relative">
          <div
            className="w-6 h-6 bg-transparent border-solid border-3 rounded-full absolute top-0 left-0"
            style={{
              borderColor: colors.greyScale[20],
            }}
          />
          <div
            className="w-6 h-6 bg-transparent border-solid border-t-3 rounded-full absolute top-0 left-0"
            style={{ borderColor: colors.blue.light }}
            ref={pullToRefresh.rotateRef}
          />
        </div>
      </div>
      {children}
    </div>
  );
};

export default PullToRefresh;
