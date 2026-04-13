"use client";

import { Absence } from "@/entities/absences/types";
import ChevronIcon from "@/shared/icons/ChevronIcon";
import { studentCode } from "@/shared/utils/student-code";
import DropdownTable from "@/widgets/dropdown-table/ui/DropdownTable";
import { useMemo } from "react";
import AbsenceItem from "./AbsenceItem";
import { useGetAbsenceReason } from "../hooks/useGetAbsenceReason";

interface Props {
  data: Absence[] | { content?: Absence[] } | null | undefined;
  allData?: Absence[] | { content?: Absence[] } | null | undefined;
}

interface AbsenceRow {
  rowKey: string;
  absences: Absence[];
  attendTypeName: string;
  studentNum: string;
  studentName: string;
}

interface AbsenceGroup {
  label: string;
  items: AbsenceRow[];
}

const toAbsenceArray = (
  value: Props["data"],
): Absence[] => {
  if (Array.isArray(value)) {
    return value;
  }

  if (value && Array.isArray(value.content)) {
    return value.content;
  }

  return [];
};

const AbsencesDropdownTable = ({ data, allData = data }: Props) => {
  const { nameById } = useGetAbsenceReason();
  const safeData = toAbsenceArray(data);
  const safeAllData = toAbsenceArray(allData);

  const groups = useMemo<AbsenceGroup[]>(() => {
    const grouped = new Map<string, AbsenceRow[]>();
    const rowsByStudentId = new Map<
      number,
      Omit<AbsenceRow, "rowKey" | "attendTypeName">
    >();

    safeAllData.forEach((absence) => {
      absence.targetStudents.forEach((student) => {
        const studentId = student.info?.id;

        if (!studentId) {
          return;
        }

        const current = rowsByStudentId.get(studentId);

        if (current) {
          current.absences.push(absence);
          return;
        }

        rowsByStudentId.set(studentId, {
          absences: [absence],
          studentNum: studentCode(
            student.info.grade,
            student.info.classNumber,
            student.info.num,
          ),
          studentName: student.name,
        });
      });
    });

    safeData.forEach((absence) => {
      const attendTypeName = nameById.get(absence.typeId) ?? "기타";
      const current = grouped.get(attendTypeName) ?? [];

      absence.targetStudents.forEach((student, index) => {
        const studentId = student.info?.id;

        if (!student.info || !studentId) {
          return;
        }

        const studentRow = rowsByStudentId.get(studentId);

        if (!studentRow) {
          return;
        }

        current.push({
          rowKey: `${absence.absenceId}-${index}`,
          absences: studentRow.absences,
          attendTypeName,
          studentNum: studentRow.studentNum,
          studentName: studentRow.studentName,
        });
      });

      if (current.length > 0) {
        grouped.set(attendTypeName, current);
      }
    });

    return Array.from(grouped.entries()).map(([label, items]) => ({
      label,
      items,
    }));
  }, [nameById, safeAllData, safeData]);

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
                data={row.absences}
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
