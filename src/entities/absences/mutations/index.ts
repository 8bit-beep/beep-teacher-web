import { useRouter } from "@cher1shrxd/loading";
import { useMutation } from "@tanstack/react-query";
import { AbsenceApi } from "../api";
import { toast } from "@cher1shrxd/toast";
import { modal } from "@bds-web/ui";
import { AxiosError } from "axios";
import { Error } from "@/shared/types/error";
import { AbsenceRequestDto } from "../types/dto";
import {
  TOAST_ISSUE_DURATION,
  TOAST_SUCCESS_DURATION,
} from "@/shared/constants/toast";

export const useUpdateAbsenceMutation = (absenceId: number) => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: AbsenceRequestDto) =>
      AbsenceApi.updateAbsence(absenceId, data),
    onSuccess: (res) => {
      if (res.data.skippedUserIds.length > 0) {
        toast.warning(
          "일부 결석 정보 수정 실패",
          `다음 학생들의 결석 정보 수정에 실패했습니다: ${res.data.skippedUserIds.join(
            ", ",
          )}`,
          TOAST_ISSUE_DURATION,
        );
      } else {
        toast.success(
          "결석 정보 수정 완료",
          "선택한 학생들의 결석 정보가 정상적으로 수정되었습니다.",
          TOAST_SUCCESS_DURATION,
        );
      }
      router.refresh();
      modal.closeAll();
    },
    onError: (error: AxiosError<Error>) => {
      toast.error(
        "결석 정보 수정 실패",
        error.response?.data.message ||
          "결석 정보 수정 중 오류가 발생했습니다.",
        TOAST_ISSUE_DURATION,
      );
    },
  });
};

export const useDeleteAbsenceMutation = (absenceId: number) => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => await AbsenceApi.deleteAbsence(absenceId),
    onSuccess: () => {
      toast.success(
        "결석 정보 삭제 완료",
        "결석 정보가 정상적으로 삭제되었습니다.",
        TOAST_SUCCESS_DURATION,
      );
      router.refresh();
      modal.closeAll();
    },
    onError: (error: AxiosError<Error>) => {
      toast.error(
        "결석 정보 삭제 실패",
        error.response?.data.message ||
          "결석 정보 삭제 중 오류가 발생했습니다.",
        TOAST_ISSUE_DURATION,
      );
    },
  });
};
