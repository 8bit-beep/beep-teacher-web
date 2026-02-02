import { DropdownItem } from "@bds-web/ui";
import { useEffect, useState } from "react";
import { CLASSROOM_OPTIONS } from "../constants/classroom";
import { useRouter } from "@cher1shrxd/loading";

export const useFilterClassroom = () => {
  let selected = CLASSROOM_OPTIONS[0];
  if (typeof window !== "undefined") {
    const previous = localStorage.getItem("selectedClassroom");
    if (previous) {
      selected = JSON.parse(previous) as DropdownItem;
    }
  }
  const [classroom, setClassroom] = useState<DropdownItem | null>(selected);
  const router = useRouter();

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
