"use client";

import { Button, Dropdown, DropdownItem } from "@bds-web/ui";
import { Fragment } from "react";
import { useGetAttendTypes } from "@/entities/attend-types/queries";
import { GRADES } from "@/shared/constants/grade";
import { useScheduleSelection } from "../hooks/useScheduleSelection";
import { NO_CHANGE_LABEL, NO_CHANGE_VALUE } from "../constants/schedule";

const ScheduleModal = () => {
  const types = useGetAttendTypes().data.data;
  const { selected, isChanged, isPending, select, save } =
    useScheduleSelection();

  const options: DropdownItem[] = [
    { name: NO_CHANGE_LABEL, value: NO_CHANGE_VALUE },
    ...types.map((type) => ({ name: type.name, value: type.id.toString() })),
  ];

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
                  options={options}
                  selected={
                    options.find(
                      (option) => option.value === selected[grade],
                    ) ?? null
                  }
                  onSelect={(item) => select(grade, item)}
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
        disabled={!isChanged || isPending}
        onClick={save}
        style={{ width: "100%" }}>
        {isPending ? "저장 중..." : "저장"}
      </Button>
    </div>
  );
};

export default ScheduleModal;
