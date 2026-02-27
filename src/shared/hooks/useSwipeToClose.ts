import { useRef, useCallback, useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { CLOSE_ANIMATION_DURATION } from "@/shared/constants/animation";
import { useRoomStore } from "@/shared/stores/room";

export const useSwipeToClose = () => {
  const { setRoom } = useRoomStore();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const triggerClose = useCallback(() => {
    setIsClosing(true);
  }, []);

  useEffect(() => {
    if (!isClosing) return;
    const timer = setTimeout(() => setRoom(null), CLOSE_ANIMATION_DURATION);
    return () => clearTimeout(timer);
  }, [isClosing, setRoom]);

  const { ref: swipeRef, ...swipeHandlers } = useSwipeable({
    onSwipedRight: triggerClose,
    delta: 80,
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: true,
  });

  const mergedRef = useCallback(
    (el: HTMLDivElement | null) => {
      containerRef.current = el;
      swipeRef(el);
    },
    [swipeRef],
  );

  return {
    handlers: { ...swipeHandlers, ref: mergedRef },
    triggerClose,
    animationClass: isClosing ? "slide-out-right" : "slide-in-right",
  };
}
