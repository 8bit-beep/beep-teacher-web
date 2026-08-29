"use client";

import { Button } from "@beep-ds/ui";
import { useGetEvents } from "@/entities/events/queries";
import { useDeleteEventMutation } from "@/entities/events/mutations";
import ChevronIcon from "@/shared/icons/ChevronIcon";
import TrashIcon from "@/shared/icons/TrashIcon";
import { formatCheckpointNames } from "../utils/format-checkpoints";

interface Props {
  date: string;
  onAdd: () => void;
  onSelect: (eventId: number) => void;
}

const EventList = ({ date, onAdd, onSelect }: Props) => {
  const events = useGetEvents(date).data.data;
  const { mutate: deleteEvent, isPending } = useDeleteEventMutation();

  return (
    <div className="w-full flex flex-col gap-4">
      <Button
        buttonSize="medium"
        buttonType="ghost"
        showIcon
        onClick={onAdd}
        style={{ width: "100%" }}>
        행사 추가
      </Button>

      {events.length === 0 ? (
        <div className="w-full flex items-center justify-center py-20 text-greyscale-40 text-body">
          등록된 행사가 없습니다.
        </div>
      ) : (
        events.map((event) => (
          <div
            key={event.id}
            className="w-full p-3 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => onSelect(event.id)}
              className="min-w-0 flex flex-col items-start gap-1 cursor-pointer">
              <span className="text-accent text-static-black truncate">
                {event.name}
              </span>
              <span className="text-caption1 text-blue-light">
                {formatCheckpointNames(event.checkpointNames)} ·{" "}
                {event.studentCount}명
              </span>
            </button>
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onSelect(event.id)}
                className="text-static-black cursor-pointer">
                <ChevronIcon size={16} rotate={-90} />
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={() => deleteEvent(event.id)}
                className="text-red-light disabled:text-greyscale-20 cursor-pointer">
                <TrashIcon size={16} />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default EventList;
