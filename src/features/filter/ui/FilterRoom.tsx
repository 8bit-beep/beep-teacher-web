"use client";

import Segment from "@/shared/ui/Segment";
import { FLOOR_OPTIONS } from "../constants/floor";
import { useFilterRoom } from "../hooks/useFilterRoom";

interface Props {
  param?: number;
}

const FilterRoom = ({ param }: Props) => {
  const { floor, setFloor } = useFilterRoom(param);

  return (
    <div className="w-76">
      <Segment segment={FLOOR_OPTIONS} selected={floor} onSelect={setFloor} />
    </div>
  );
};

export default FilterRoom;
