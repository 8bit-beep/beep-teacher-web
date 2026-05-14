"use client";

import { useState } from "react";
import type { FilterOption } from "@/shared/ui/filter-bar";

export const FLOOR_OPTIONS: FilterOption[] = [
  { label: "1층", value: "1" },
  { label: "2층", value: "2" },
  { label: "3층", value: "3" },
  { label: "실습동 외", value: "other" },
];

export const useFloorFilter = () => {
  const [selectedFloor, setSelectedFloor] = useState(FLOOR_OPTIONS[0].value);

  return {
    selectedFloor,
    setSelectedFloor,
  };
};
