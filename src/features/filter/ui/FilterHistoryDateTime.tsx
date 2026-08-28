"use client";

import { DatePicker, Dropdown } from "@beep-ds/ui";
import { useFilterHistoryDateTime } from "../hooks/useFilterHistoryDateTime";
import { parseDate } from "@/shared/utils/pare-date";

const FilterHistoryDateTime = () => {
  const {
    selectedDate,
    setSelectedDate,
  } = useFilterHistoryDateTime();

  return (
    <>
      <DatePicker
        date={new Date(selectedDate)}
        onChangeDate={(date) => setSelectedDate(parseDate(date))}
        title="기록일 선택"
      />
    </>
  );
};

export default FilterHistoryDateTime;
