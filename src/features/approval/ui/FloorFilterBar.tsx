"use client";

import { useApprovalListQuery } from "@/entities/approvals/queries";
import { useFloorFilter, FLOOR_OPTIONS } from "@/features/approval/hooks/useFloorFilter";
import { FilterBar } from "@/shared/ui/filter-bar";

const FloorFilterBar = () => {
  const { selectedFloor, setSelectedFloor } = useFloorFilter();

  useApprovalListQuery({ floor: selectedFloor });

  return (
    <FilterBar
      options={FLOOR_OPTIONS}
      selected={selectedFloor}
      onChange={setSelectedFloor}
    />
  );
};

export default FloorFilterBar;
