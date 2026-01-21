"use client";

import { SegmentItem } from "../types/segment-item";

interface Props {
  segment: SegmentItem[];
  selected: SegmentItem;
  onSelect: (item: SegmentItem) => void;
}

const Segment = ({ segment, selected, onSelect }: Props) => {
  return (
    <div className="w-full bg-greyscale-10 px-3 py-2 rounded-large flex items-center gap-2.5">
      {segment.map((item) => (
        <span
          key={item.value}
          className={`flex-1 text-body cursor-pointer rounded-medium h-8 flex items-center justify-center  ${
            item.value === selected.value
              ? "bg-blue-light text-white"
              : "bg-white text-static-black"
          }`}
          onClick={() => onSelect(item)}>
          {item.label}
        </span>
      ))}
    </div>
  );
};

export default Segment;
