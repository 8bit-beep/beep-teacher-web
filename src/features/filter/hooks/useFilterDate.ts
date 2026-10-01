"use client";

import { useRouter } from "@cher1shrxd/loading";
import { useSearchParams } from "next/navigation";
import { parseDate } from "@/shared/utils/pare-date";

const toDate = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);

  return new Date(year, month - 1, day);
};

export const useFilterDate = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");
  const date = dateParam ? toDate(dateParam) : new Date();

  const setDate = (next: Date) => {
    const value = parseDate(next);
    const params = new URLSearchParams(searchParams.toString());

    if (value === parseDate(new Date())) {
      params.delete("date");
    } else {
      params.set("date", value);
    }

    const query = params.toString();
    router.push(query ? `/classroom?${query}` : "/classroom");
  };

  return { date, setDate };
};
