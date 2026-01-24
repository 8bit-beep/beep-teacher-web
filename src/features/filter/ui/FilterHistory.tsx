"use client";

import Segment from "@/shared/ui/Segment";
import { FLOOR_OPTIONS } from "../constants/floor";
import { useFilterHistory } from "../hooks/useFilterHistory";

interface Props {
  param?: number;
}

const FilterHistory = ({ param }: Props) => {
  const { floor, setFloor } = useFilterHistory(param);

  return (
    <div className="w-76">
      <Segment segment={FLOOR_OPTIONS} selected={floor} onSelect={setFloor} />
    </div>
  );
};

export default FilterHistory;
