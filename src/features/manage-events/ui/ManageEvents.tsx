"use client";

import { Button } from "@beep-ds/ui";
import { useMemo, useState } from "react";
import { parseDate } from "@/shared/utils/pare-date";
import EventPanel from "./EventPanel";

const ManageEvents = () => {
  const [isOpened, setIsOpened] = useState(false);
  const today = useMemo(() => new Date(), []);
  const date = parseDate(today);

  return (
    <>
      <Button
        buttonSize="small"
        buttonType="primary"
        showIcon
        onClick={() => setIsOpened(true)}
        className="whitespace-nowrap">
        교내 행사
      </Button>
      {isOpened && (
        <EventPanel
          today={today}
          date={date}
          onClose={() => setIsOpened(false)}
        />
      )}
    </>
  );
};

export default ManageEvents;
