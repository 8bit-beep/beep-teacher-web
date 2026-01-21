import { Day } from "@/shared/types/day";

export const parseDay = (day: Day): string => {
  switch (day) {
    case "MONDAY":
      return "월요일";
    case "TUESDAY":
      return "화요일";
    case "WEDNESDAY":
      return "수요일";
    case "THURSDAY":
      return "목요일";
  }
};
