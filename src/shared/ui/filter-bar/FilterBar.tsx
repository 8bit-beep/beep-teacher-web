"use client";

import type { MouseEvent } from "react";

export interface FilterOption {
  label: string;
  value: string;
}

interface Props {
  options: FilterOption[];
  selected: string;
  onChange: (value: string) => void;
  className?: string;
}

const FilterBar = ({ options, selected, onChange, className }: Props) => {
  return (
    <div
      className={`w-full flex items-center gap-2 border-b border-blue-light ${className ?? ""}`.trim()}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            onChange(option.value);
          }}
          className={`flex-1 px-4 py-2 text-accent cursor-pointer border-b-[5px] ${
            option.value === selected
              ? "text-blue-dark border-blue-light"
              : "text-gray-400 border-transparent"
          }`}>
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
