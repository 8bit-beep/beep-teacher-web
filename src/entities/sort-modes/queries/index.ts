import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { SortModeApi } from "../api";

export const useGetSortModes = () => {
  return useSuspenseQuery({
    queryKey: ["attendance-sort-modes"],
    queryFn: SortModeApi.getSortModes,
  });
};

export const useGetSortModesQuery = () => {
  return useQuery({
    queryKey: ["attendance-sort-modes"],
    queryFn: SortModeApi.getSortModes,
  });
};
