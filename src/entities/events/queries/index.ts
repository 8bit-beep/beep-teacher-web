import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { EventApi } from "../api";

export const useGetEvents = (date: string) => {
  return useSuspenseQuery({
    queryKey: ["events", date],
    queryFn: () => EventApi.getEvents(date),
  });
};

export const useGetEvent = (eventId: number | null) => {
  return useQuery({
    queryKey: ["events", "detail", eventId],
    queryFn: () => EventApi.getEvent(eventId!),
    enabled: eventId !== null,
  });
};
