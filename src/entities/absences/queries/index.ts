import { useQuery } from "@tanstack/react-query";
import { AbsenceApi } from "../api";

const PAGE_SIZE = 100;

export const useGetAllAbsencesQuery = () => {
  return useQuery({
    queryKey: ["absences", "all"],
    queryFn: async () => {
      const firstPage = await AbsenceApi.getAbsences(0, PAGE_SIZE);
      const additionalPages =
        firstPage.data.totalPages > 1
          ? await Promise.all(
              Array.from({ length: firstPage.data.totalPages - 1 }, (_, index) =>
                AbsenceApi.getAbsences(index + 1, PAGE_SIZE),
              ),
            )
          : [];

      return [
        ...firstPage.data.content,
        ...additionalPages.flatMap((response) => response.data.content),
      ];
    },
  });
};
