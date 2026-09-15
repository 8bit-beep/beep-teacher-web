"use client";

import { RefObject, useEffect, useState } from "react";

export const useHasOverflow = (
  ref: RefObject<HTMLElement | null>,
  contentKey: number,
) => {
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver(() => {
      setHasOverflow(element.scrollHeight > element.clientHeight);
    });
    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, contentKey]);

  return hasOverflow;
};
