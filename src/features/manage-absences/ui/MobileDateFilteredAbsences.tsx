"use client";

import { useState } from "react";
import type { Absence } from "@/entities/absences/types";
import { FilterBar } from "@/shared/ui/filter-bar";
import type { FilterOption } from "@/shared/ui/filter-bar";
import AbsencesDropdownTable from "./AbsencesDropdownTable";

interface Props {
  allData: Absence[];
  todayData: Absence[];
}

const DATE_FILTER_OPTIONS: FilterOption[] = [
  { label: "전체", value: "all" },
  { label: "오늘", value: "today" },
];

const MobileDateFilteredAbsences = ({ allData, todayData }: Props) => {
  const [selected, setSelected] = useState(DATE_FILTER_OPTIONS[1].value);

  return (
    <div className="flex flex-col gap-3">
      <FilterBar
        options={DATE_FILTER_OPTIONS}
        selected={selected}
        onChange={setSelected}
        className="xl:hidden"
      />
      <AbsencesDropdownTable
        data={selected === "all" ? allData : todayData}
        allData={allData}
      />
    </div>
  );
};

export default MobileDateFilteredAbsences;
