"use client";

import type { FilterOption } from "@/shared/ui/filter-bar";
import { useRouter, useSearchParams } from "next/navigation";

export const FLOOR_OPTIONS: FilterOption[] = [
  { label: "1층", value: "1" },
  { label: "2층", value: "2" },
  { label: "3층", value: "3" },
  { label: "실습동 외", value: "other" },
];

export const useFloorFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedFloor = searchParams.get("floor") ?? FLOOR_OPTIONS[1].value;

  const setSelectedFloor = (value: string) => {
    router.push(`?floor=${value}`);
  };

  return { selectedFloor, setSelectedFloor };
};
