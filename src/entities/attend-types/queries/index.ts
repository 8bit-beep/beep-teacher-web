import { useSuspenseQuery } from "@tanstack/react-query";
import { AttendTypeApi } from "../api";

export const useGetAttendTypes = () => {
  return useSuspenseQuery({
    queryKey: ["attend-types"],
    queryFn: AttendTypeApi.getAttendTypes,
  });
}