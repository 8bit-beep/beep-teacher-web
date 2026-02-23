"use client";

import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { useRefresh } from "../hooks/useRefresh";
import { colors } from "@bds-web/colors";

const PullToRefresh = ({ children }: PropsWithChildren) => {
  const refreshRef = useRef<HTMLDivElement>(null);
  const rotateRef = useRef<HTMLDivElement>(null);
  const handleRefresh = useRefresh();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startY = useRef(0);
  const [isTouch, setIsTouch] = useState(false);
  const [pulled, setPulled] = useState(false);
  const maxDistance = 100;

  useEffect(() => {
    const touchMoveListener = (e: TouchEvent) => {
      if (isTouch && pulled) {
        onMove(e.touches[0].clientY);
        e.preventDefault();
      }
    };

    document.addEventListener("touchmove", touchMoveListener, {
      passive: false,
    });

    return () => {
      document.removeEventListener("touchmove", touchMoveListener);
    };
  }, [isTouch, pulled]);

  const ableBodyScroll = () => {
    document.body.style.overflow = "auto";
  };

  const preventBodyScroll = () => {
    document.body.style.overflow = "hidden";
  };

  const resetToInitial = () => {
    if (refreshRef.current) {
      refreshRef.current.style.height = "0";
      refreshRef.current.style.willChange = "unset";
    }
    rotateCircle(false);
    setPulled(false);
    setIsRefreshing(false);
  };

  const rotateCircle = (state: boolean) => {
    if (rotateRef.current) {
      if (state) {
        rotateRef.current.classList.add("animate-spin");
      } else {
        rotateRef.current.classList.remove("animate-spin");
      }
    }
  };

  const onStart = (y: number, touch: boolean) => {
    startY.current = y;
    setIsTouch(touch);
    setPulled(true);
    if (refreshRef.current) {
      refreshRef.current.style.willChange = "height";
    }
  };

  const onMove = (y: number) => {
    if (pulled && refreshRef.current && rotateRef.current && !isRefreshing) {
      const moveY = Math.max(y - startY.current, 0);
      const pulledDistance = Math.min(Math.pow(moveY, 0.875), maxDistance);

      if (pulledDistance > 0) {
        refreshRef.current.style.height = `${pulledDistance}px`;
        rotateRef.current.style.rotate = `${pulledDistance}deg`;
        preventBodyScroll();

        if (pulledDistance >= maxDistance) {
          setIsRefreshing(true);
        } else {
          setIsRefreshing(false);
        }
      } else {
        ableBodyScroll();
        resetToInitial();
      }
    }
  };

  const onEnd = async () => {
    if (pulled) {
      ableBodyScroll();
      if (isRefreshing) {
        try {
          rotateCircle(true);
          await handleRefresh();
          await new Promise((resolve) => {
            setTimeout(resolve, 500);
          });
        } finally {
          resetToInitial();
        }
      } else {
        resetToInitial();
      }
    }
  };

  const handleEnd = () => {
    if (isTouch && pulled) {
      onEnd();
    }
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      onStart(e.touches[0].clientY, true);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (window.scrollY === 0) {
      onStart(e.clientY, false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isTouch && pulled) {
      onMove(e.clientY);
      e.preventDefault();
    }
  };

  const handleMouseUp = () => {
    if (!isTouch) {
      onEnd();
    }
  };

  return (
    <div
      className="w-full h-full"
      onTouchStart={handleTouchStart}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchEnd={handleEnd}
    >
      <div
        className="w-full flex justify-center items-center h-0 overflow-hidden bg-greyscale-10"
        ref={refreshRef}
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
            ref={rotateRef}
          />
        </div>
      </div>
      {children}
    </div>
  );
};

export default PullToRefresh;
