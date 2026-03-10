import { useSuspenseQuery } from "@tanstack/react-query";
import { AbsenceApi } from "../api";

export const useGetAllAbsencesReason = () => {
  return useSuspenseQuery({
    queryKey: ["absences-reasons"],
    queryFn: AbsenceApi.getReasons,
  });
};
