import { DropdownItem, modal } from "@bds-web/ui";
import { useRouter } from "@cher1shrxd/loading";
import { toast } from "@cher1shrxd/toast";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SortModeApi } from "@/entities/sort-modes/api";
import { AttendanceSortMode } from "@/entities/sort-modes/types";
import { useGetSortModes } from "@/entities/sort-modes/queries";
import { GRADES } from "@/shared/constants/grade";
import {
  TOAST_ISSUE_DURATION,
  TOAST_SUCCESS_DURATION,
} from "@/shared/constants/toast";
import { NO_CHANGE_VALUE } from "../constants/schedule";

const buildSelection = (modes: AttendanceSortMode[]) =>
  Object.fromEntries(
    GRADES.map((grade) => [
      grade,
      modes.find((mode) => mode.grade === grade)?.type?.id.toString() ??
        NO_CHANGE_VALUE,
    ]),
  );

export const useScheduleSelection = () => {
  const modes = useGetSortModes().data.data.modes;
  const queryClient = useQueryClient();
  const router = useRouter();

  const [initial] = useState(() => buildSelection(modes));
  const [selected, setSelected] = useState<Record<number, string>>(initial);
  const [isPending, setIsPending] = useState(false);

  const isChanged = GRADES.some((grade) => selected[grade] !== initial[grade]);

  const select = (grade: number, item: DropdownItem | null) => {
    if (!item) return;
    setSelected((prev) => ({ ...prev, [grade]: item.value }));
  };

  const save = async () => {
    setIsPending(true);

    try {
      const changedGrades = GRADES.filter(
        (grade) => selected[grade] !== initial[grade],
      );

      await Promise.all(
        changedGrades.map((grade) =>
          SortModeApi.updateSortMode({
            grade,
            ...(selected[grade] !== NO_CHANGE_VALUE && {
              typeId: Number(selected[grade]),
            }),
          }),
        ),
      );

      await queryClient.refetchQueries();
      router.refresh();

      toast.success(
        "스케줄 변경 완료",
        "출석 조회가 변경된 스케줄 기준으로 정렬됩니다.",
        TOAST_SUCCESS_DURATION,
      );
      modal.close();
    } catch {
      toast.error(
        "스케줄 변경 실패",
        "잠시 후 다시 시도해주세요.",
        TOAST_ISSUE_DURATION,
      );
    } finally {
      setIsPending(false);
    }
  };

  return { selected, isChanged, isPending, select, save };
};
