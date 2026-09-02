import api from "@/shared/libs/api";
import { Event, EventDetail, EventRequestDto } from "../types";

export const EventApi = {
  getEvents: async (date: string) => {
    return await api.get<Event[]>(`/events?date=${date}`);
  },

  getEvent: async (eventId: number) => {
    return await api.get<EventDetail>(`/events/${eventId}`);
  },

  createEvent: async (data: EventRequestDto) => {
    return await api.post<EventDetail>("/events", data);
  },

  updateEvent: async (eventId: number, data: EventRequestDto) => {
    return await api.patch<EventDetail>(`/events/${eventId}`, data);
  },

  deleteEvent: async (eventId: number) => {
    return await api.delete(`/events/${eventId}`);
  },
};
