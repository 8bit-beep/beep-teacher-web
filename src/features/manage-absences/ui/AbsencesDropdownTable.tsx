"use client";

import { Absence } from "@/entities/absences/types";
import { useGetAttendTypes } from "@/entities/attend-types/queries";
import ChevronIcon from "@/shared/icons/ChevronIcon";
import { studentCode } from "@/shared/utils/student-code";
import DropdownTable from "@/widgets/dropdown-table/ui/DropdownTable";
import { useMemo } from "react";
import AbsenceItem from "./AbsenceItem";

interface Props {
  data: Absence[];
}

interface AbsenceRow {
  rowKey: string;
  absence: Absence;
  attendTypeName: string;
  studentNum: string;
  studentName: string;
}

interface AbsenceGroup {
  label: string;
  items: AbsenceRow[];
}

const AbsencesDropdownTable = ({ data }: Props) => {
  const attendTypesData = useGetAttendTypes().data?.data;

  const typeNameById = useMemo(
    () =>
      new Map(
        (attendTypesData ?? []).map((type) => [type.id, type.name] as const),
      ),
    [attendTypesData],
  );

  const groups = useMemo<AbsenceGroup[]>(() => {
    const grouped = new Map<string, AbsenceRow[]>();

    data.forEach((absence) => {
      const attendTypeName = typeNameById.get(absence.typeId) ?? "기타";
      const current = grouped.get(attendTypeName) ?? [];

      absence.targetStudents.forEach((student, index) => {
        current.push({
          rowKey: `${absence.absenceId}-${index}`,
          absence,
          attendTypeName,
          studentNum: studentCode(
            student.info.grade,
            student.info.classNumber,
            student.info.num,
          ),
          studentName: student.name,
        });
      });

      grouped.set(attendTypeName, current);
    });

    return Array.from(grouped.entries()).map(([label, items]) => ({
      label,
      items,
    }));
  }, [data, typeNameById]);

  return (
    <DropdownTable
      data={groups}
      className="w-full"
      getKey={(group) => group.label}
      emptyContent={
        <div className="w-full flex items-center justify-center py-20 text-greyscale-50">
          결석 정보가 없습니다.
        </div>
      }
      renderTrigger={(group, _index, { isOpen, toggle }) => (
        <button
          type="button"
          onClick={toggle}
          className="w-full h-13.5 px-2 flex items-center justify-between border-b border-greyscale-20 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <p className="text-accent text-static-black">{group.label}</p>
            <p className="text-accent text-static-black">·</p>
            <p className="text-accent text-blue-light">
              {group.items.length}명
            </p>
          </div>
          <ChevronIcon
            size={16}
            className="text-static-black"
            rotate={isOpen ? 0 : -180}
          />
        </button>
      )}
      renderContent={(group) => (
        <div className="w-full">
          {group.items.map((row, index) => (
            <div
              key={row.rowKey}
              className={index % 2 === 0 ? "bg-[#EFF8FF]" : "bg-white"}
            >
              <AbsenceItem
                data={row.absence}
                attendTypeName={row.attendTypeName}
                studentNum={row.studentNum}
                studentName={row.studentName}
              />
            </div>
          ))}
        </div>
      )}
    />
  );
};

export default AbsencesDropdownTable;
