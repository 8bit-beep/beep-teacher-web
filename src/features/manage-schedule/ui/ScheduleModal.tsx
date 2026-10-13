"use client";

import { Button, Dropdown, DropdownItem } from "@beep-ds/ui";
import { Fragment } from "react";
import { useGetAttendTypes } from "@/entities/attend-types/queries";
import { useGetSortModes } from "@/entities/sort-modes/queries";
import { GRADES } from "@/shared/constants/grade";
import { useScheduleSelection } from "../hooks/useScheduleSelection";
import {
  DEFAULT_SCHEDULE_LABEL,
  NO_CHANGE_VALUE,
  SORT_MODE_TYPE_NAMES,
} from "../constants/schedule";

const ScheduleModal = () => {
  const types = useGetAttendTypes().data.data;
  const modes = useGetSortModes().data.data.modes;
  const { selected, isChanged, isPending, select, save } =
    useScheduleSelection();

  const typeOptions: DropdownItem[] = types
    .filter((type) => SORT_MODE_TYPE_NAMES.includes(type.name))
    .map((type) => ({ name: type.name, value: type.id.toString() }));

  const getOptions = (grade: number): DropdownItem[] => {
    const defaultTypeName = modes.find(
      (mode) => mode.grade === grade,
    )?.defaultType?.name;

    return [
      {
        name: defaultTypeName
          ? `${DEFAULT_SCHEDULE_LABEL} (${defaultTypeName})`
          : DEFAULT_SCHEDULE_LABEL,
        value: NO_CHANGE_VALUE,
      },
      ...typeOptions,
    ];
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
                  options={getOptions(grade)}
                  selected={
                    getOptions(grade).find(
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
