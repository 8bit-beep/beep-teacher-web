"use client";

import { Suspense, useState } from "react";
import { CloseIcon } from "@/shared/icons/CloseIcon";
import { formatEventDate } from "../utils/format-event-date";
import EventList from "./EventList";
import EventFormContainer from "./EventFormContainer";

interface Props {
  today: Date;
  date: string;
  onClose: () => void;
}

type Phase = { type: "list" } | { type: "form"; eventId: number | null };

const EventPanel = ({ today, date, onClose }: Props) => {
  const [phase, setPhase] = useState<Phase>({ type: "list" });

  const backToList = () => setPhase({ type: "list" });

  return (
    <aside className="fixed top-0 right-0 z-40 h-screen w-full sm:w-144 bg-static-white rounded-medium flex flex-col gap-4 p-4 overflow-y-auto">
      <div className="w-full flex items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          className="size-11 rounded-full bg-static-white shadow-modal flex items-center justify-center text-static-black cursor-pointer">
          <CloseIcon />
        </button>
        <h2 className="text-h3 text-static-black">
          {formatEventDate(today)} 행사 관리
        </h2>
      </div>

      <Suspense
        fallback={
          <div className="w-full flex items-center justify-center py-20 text-greyscale-50">
            불러오는 중...
          </div>
        }>
        {phase.type === "list" ? (
          <EventList
            date={date}
            onAdd={() => setPhase({ type: "form", eventId: null })}
            onSelect={(eventId) => setPhase({ type: "form", eventId })}
          />
        ) : (
          <EventFormContainer
            date={date}
            eventId={phase.eventId}
            onDone={backToList}
            onCancel={backToList}
          />
        )}
      </Suspense>
    </aside>
  );
};

export default EventPanel;
