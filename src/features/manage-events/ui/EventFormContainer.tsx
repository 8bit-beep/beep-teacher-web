"use client";

import { useGetEvent } from "@/entities/events/queries";
import EventForm from "./EventForm";

interface Props {
  date: string;
  eventId: number | null;
  onDone: () => void;
  onCancel: () => void;
}

const EventFormContainer = ({ date, eventId, onDone, onCancel }: Props) => {
  const { data, isLoading } = useGetEvent(eventId);

  if (eventId !== null && (isLoading || !data)) {
    return (
      <div className="w-full flex items-center justify-center py-20 text-greyscale-50">
        불러오는 중...
      </div>
    );
  }

  return (
    <EventForm
      date={date}
      detail={eventId !== null ? data?.data : undefined}
      onDone={onDone}
      onCancel={onCancel}
    />
  );
};

export default EventFormContainer;
