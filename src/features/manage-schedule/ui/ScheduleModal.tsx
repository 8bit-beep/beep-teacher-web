"use client";

import { Button, Dropdown, DropdownItem, modal } from "@bds-web/ui";
import { Fragment, useState } from "react";
import { useScheduleStore } from "@/shared/stores/schedule";
import { GRADES, SCHEDULE_OPTIONS } from "../constants/schedule";

const ScheduleModal = () => {
  const { schedules, setSchedules } = useScheduleStore();
  const [selected, setSelected] = useState<Record<number, string>>(schedules);

  const isChanged = GRADES.some(
    (grade) => selected[grade] !== schedules[grade],
  );

  const handleSelect = (grade: number, item: DropdownItem | null) => {
    if (!item) return;
    setSelected((prev) => ({ ...prev, [grade]: item.value }));
  };

  const handleSave = () => {
    setSchedules(selected);
    modal.close();
  };

  return (
    <div className="w-60 max-w-full flex flex-col gap-4">
      <div className="w-full flex flex-col gap-3 px-2.5 py-3">
        {GRADES.map((grade, index) => (
          <Fragment key={grade}>
            {index > 0 && (
              <div className="w-full border-b border-greyscale-10" />
            )}
            <div className="w-full flex items-center gap-10">
              <span className="text-body text-static-black whitespace-nowrap">
                {grade}학년
              </span>
              <div className="flex-1 min-w-0">
                <Dropdown
                  options={SCHEDULE_OPTIONS}
                  selected={
                    SCHEDULE_OPTIONS.find(
                      (option) => option.value === selected[grade],
                    ) ?? null
                  }
                  onSelect={(item) => handleSelect(grade, item)}
                  dropdownSize="medium"
                  width="100%"
                />
              </div>
            </div>
          </Fragment>
        ))}
      </div>
      <Button
        buttonType="primary"
        buttonSize="medium"
        disabled={!isChanged}
        onClick={handleSave}
        style={{ width: "100%" }}>
        저장
      </Button>
    </div>
  );
};

export default ScheduleModal;
