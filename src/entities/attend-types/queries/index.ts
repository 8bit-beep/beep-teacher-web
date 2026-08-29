import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { AttendTypeApi } from "../api";

export const useGetAttendTypes = () => {
  return useSuspenseQuery({
    queryKey: ["attend-types"],
    queryFn: AttendTypeApi.getAttendTypes,
  });
}

export const useGetAttendTypesQuery = () => {
  return useQuery({
    queryKey: ["attend-types"],
    queryFn: AttendTypeApi.getAttendTypes,
  });
}