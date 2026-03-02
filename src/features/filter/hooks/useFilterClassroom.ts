import { DropdownItem } from "@bds-web/ui";
import { useEffect, useState } from "react";
import { CLASSROOM_OPTIONS } from "../constants/classroom";
import { useRouter } from "@cher1shrxd/loading";

export const useFilterClassroom = () => {
  const [classroom, setClassroom] = useState<DropdownItem | null>(null);
  const router = useRouter();

  useEffect(() => {
    const previous = localStorage.getItem("selectedClassroom");
    setClassroom(previous ? (JSON.parse(previous) as DropdownItem) : CLASSROOM_OPTIONS[0]);
  }, []);

  useEffect(() => {
    if (classroom) {
      router.push(
        classroom.value !== "1-1"
          ? `/classroom?classroom=${classroom.value}`
          : "/classroom",
      );
      localStorage.setItem("selectedClassroom", JSON.stringify(classroom));
    }
  }, [classroom]);

  return {
    classroom,
    setClassroom,
  };
};
