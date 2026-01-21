"use client";

import { SegmentItem } from "../types/segment-item";

interface Props {
  segment: SegmentItem[];
  selected: SegmentItem;
  onSelect: (item: SegmentItem) => void;
}

const Segment = ({ segment, selected, onSelect }: Props) => {
  return (
    <div className="w-full bg-static-white p-2 rounded-small flex items-center shadow-modal">
      {segment.map((item) => (
        <span
          key={item.value}
          className={`flex-1 text-body cursor-pointer rounded-small px-2 py-1.5 flex items-center justify-center  ${
            item.value === selected.value
              ? "bg-blue-light text-white"
              : "bg-white text-blue-light"
          }`}
          onClick={() => onSelect(item)}>
          {item.label}
        </span>
      ))}
    </div>
  );
};

export default Segment;
