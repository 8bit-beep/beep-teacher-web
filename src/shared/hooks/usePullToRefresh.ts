import { useEffect, useRef, useState } from "react";
import { useRefresh } from "./useRefresh";

export const usePullToRefresh = () => {
  const refreshRef = useRef<HTMLDivElement>(null);
  const rotateRef = useRef<HTMLDivElement>(null);
  const handleRefresh = useRefresh();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startY = useRef(0);
  const [isTouch, setIsTouch] = useState(false);
  const [pulled, setPulled] = useState(false);
  const maxDistance = 100;

  const getScrollableChild = (
    target: EventTarget | null,
    boundary: HTMLElement,
  ) => {
    if (!(target instanceof HTMLElement)) {
      return null;
    }

    let current: HTMLElement | null = target;

    while (current && current !== boundary) {
      const style = window.getComputedStyle(current);
      const isScrollableY =
        (style.overflowY === "auto" || style.overflowY === "scroll") &&
        current.scrollHeight > current.clientHeight;

      if (isScrollableY) {
        return current;
      }

      current = current.parentElement;
    }

    return null;
  };

  const canStartPull = (target: EventTarget | null, boundary: HTMLElement) => {
    const scrollableChild = getScrollableChild(target, boundary);

    if (!scrollableChild) {
      return true;
    }

    return scrollableChild.scrollTop <= 0;
  };

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
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (canStartPull(e.target, e.currentTarget)) {
      onStart(e.touches[0].clientY, true);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (canStartPull(e.target, e.currentTarget)) {
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

  return {
    refreshRef,
    rotateRef,
    isRefreshing,
    handlers: {
      handleTouchStart,
      handleMouseDown,
      handleMouseMove,
      handleMouseUp,
      handleMouseLeave: handleMouseUp,
      handleEnd,
    },
  };
};
