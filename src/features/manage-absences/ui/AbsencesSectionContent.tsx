"use client";

import { useState } from "react";
import type { Absence } from "@/entities/absences/types";
import CalendarIcon from "@/shared/icons/CalendarIcon";
import { FilterBar } from "@/shared/ui/filter-bar";
import type { FilterOption } from "@/shared/ui/filter-bar";
import Section from "@/widgets/section/ui/Section";
import CreateAbsence from "./CreateAbsence";
import AbsencesDropdownTable from "./AbsencesDropdownTable";

interface Props {
  allData: Absence[];
  todayData: Absence[];
}

const DATE_FILTER_OPTIONS: FilterOption[] = [
  { label: "전체", value: "all" },
  { label: "오늘", value: "today" },
];

const AbsencesSectionContent = ({ allData, todayData }: Props) => {
  const [selected, setSelected] = useState(DATE_FILTER_OPTIONS[1].value);

  return (
    <Section
      title="외박자 관리"
      description="학생들의 외박 여부를 관리하세요!"
      icon={<CalendarIcon size={24} />}
      headerOptions={
        <>
          <div className="lg:hidden">
            <CreateAbsence />
          </div>
          <FilterBar
            options={DATE_FILTER_OPTIONS}
            selected={selected}
            onChange={setSelected}
            variant="segment"
            className="hidden xl:flex"
          />
        </>
      }
      mobileFilter={
        <FilterBar
          options={DATE_FILTER_OPTIONS}
          selected={selected}
          onChange={setSelected}
        />
      }>
      <div className="flex-1 min-h-0 overflow-y-auto px-2 xl:px-10">
        <AbsencesDropdownTable
          data={selected === "all" ? allData : todayData}
          allData={allData}
        />
      </div>
    </Section>
  );
};

export default AbsencesSectionContent;
