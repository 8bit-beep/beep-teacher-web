"use client";

import { DatePicker } from "@beep-ds/ui";
import { useFilterDate } from "../hooks/useFilterDate";

const FilterDate = () => {
  const { date, setDate } = useFilterDate();

  return <DatePicker date={date} onChangeDate={setDate} title="조회 날짜 선택" />;
};

export default FilterDate;
