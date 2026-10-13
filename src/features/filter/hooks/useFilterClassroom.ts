"use client";

import { DropdownItem } from "@beep-ds/ui";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CLASSROOM_OPTIONS } from "../constants/classroom";
import { useRouter } from "@cher1shrxd/loading";

export const useFilterClassroom = () => {
  const [classroom, setClassroom] = useState<DropdownItem | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const previous = localStorage.getItem("selectedClassroom");
    setClassroom(previous ? (JSON.parse(previous) as DropdownItem) : CLASSROOM_OPTIONS[0]);
  }, []);

  useEffect(() => {
    if (classroom) {
      const params = new URLSearchParams(searchParams.toString());

      if (classroom.value !== "1-1") {
        params.set("classroom", classroom.value);
      } else {
        params.delete("classroom");
      }

      const query = params.toString();
      router.push(query ? `/classroom?${query}` : "/classroom");
      localStorage.setItem("selectedClassroom", JSON.stringify(classroom));
    }
  }, [classroom]);

  return {
    classroom,
    setClassroom,
  };
};
