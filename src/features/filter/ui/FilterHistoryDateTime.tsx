"use client";

import { DatePicker, Dropdown } from "@bds-web/ui";
import { useFilterHistoryDateTime } from "../hooks/useFilterHistoryDateTime";
import { parseDate } from "@/shared/utils/pare-date";

const FilterHistoryDateTime = () => {
  const {
    selectedDate,
    setSelectedDate,
    selectedCheckpoint,
    setSelectedCheckpoint,
    options,
  } = useFilterHistoryDateTime();

  return (
    <>
      <DatePicker
        date={new Date(selectedDate)}
        onChangeDate={(date) => setSelectedDate(parseDate(date))}
        title="기록일 선택"
      />
      <Dropdown
        onSelect={setSelectedCheckpoint}
        selected={selectedCheckpoint}
        options={options}
        dropdownSize="large"
      />
    </>
  );
};

export default FilterHistoryDateTime;
