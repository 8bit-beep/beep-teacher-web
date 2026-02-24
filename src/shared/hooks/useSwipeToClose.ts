import { useRef, useCallback } from "react";
import { useSwipeable } from "react-swipeable";

export function useSwipeToClose(onClose: () => void) {
  const containerRef = useRef<HTMLDivElement>(null);

  const triggerClose = () => {
    const el = containerRef.current;
    if (el) {
      el.classList.remove("slide-in-right");
      el.classList.add("slide-out-right");
    }
    setTimeout(() => onClose(), 300);
  };

  const { ref: swipeRef, ...swipeHandlers } = useSwipeable({
    onSwipedRight: triggerClose,
    delta: 80,
    preventScrollOnSwipe: true,
    trackTouch: true,
  });

  const mergedRef = useCallback(
    (el: HTMLDivElement | null) => {
      (containerRef as { current: HTMLDivElement | null }).current = el;
      swipeRef(el);
    },
    [swipeRef],
  );

  return { handlers: { ...swipeHandlers, ref: mergedRef } };
}
