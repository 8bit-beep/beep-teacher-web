import { useRouter } from "@cher1shrxd/loading";
import { useMutation } from "@tanstack/react-query";
import { AbsenceApi } from "../api";
import { toast } from "@cher1shrxd/toast";
import { modal } from "@beep-ds/ui";
import { AxiosError } from "axios";
import { Error } from "@/shared/types/error";
import { AbsenceRequestDto, AbsenceResponseDto } from "../types/dto";
import {
  TOAST_ISSUE_DURATION,
  TOAST_SUCCESS_DURATION,
} from "@/shared/constants/toast";

interface CreateAbsenceToastState {
  title: string;
  description: string;
  type: "warning" | "success";
}

export const getCreateAbsenceToastState = (
  skippedUserIds: number[],
  requestedCount: number,
): CreateAbsenceToastState => {
  if (requestedCount > 0 && skippedUserIds.length === requestedCount) {
    return {
      title: "이미 추가된 대상",
      description: "선택한 대상은 이미 같은 조건의 외박 정보가 등록되어 있습니다.",
      type: "warning",
    };
  }

  if (skippedUserIds.length > 0) {
    return {
      title: "일부 외박 처리 실패",
      description: `다음 학생들의 외박 처리에 실패했습니다: ${Array.from(new Set(skippedUserIds)).join(", ")}`,
      type: "warning",
    };
  }

  return {
    title: "외박 처리 완료",
    description: "선택한 학생들의 외박이 정상적으로 처리되었습니다.",
    type: "success",
  };
};

export const useCreateAbsenceMutation = () => {
  return useMutation({
    mutationFn: AbsenceApi.createAbsence,
    onError: (_error: AxiosError<Error>) => {
      toast.error(
        "외박 처리 실패",
        "잠시 후 다시 시도해주세요.",
        TOAST_ISSUE_DURATION,
      );
    },
  });
};

export const useUpdateAbsenceMutation = (absenceId: number) => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: AbsenceRequestDto) =>
      AbsenceApi.updateAbsence(absenceId, data),
    onSuccess: (res) => {
      if (res.data.skippedUserIds.length > 0) {
        toast.warning(
          "일부 외박 정보 수정 실패",
          `다음 학생들의 외박 정보 수정에 실패했습니다: ${res.data.skippedUserIds.join(
            ", ",
          )}`,
          TOAST_ISSUE_DURATION,
        );
      } else {
        toast.success(
          "외박 정보 수정 완료",
          "선택한 학생들의 외박 정보가 정상적으로 수정되었습니다.",
          TOAST_SUCCESS_DURATION,
        );
      }
      router.refresh();
      modal.closeAll();
    },
    onError: (error: AxiosError<Error>) => {
      toast.error(
        "외박 정보 수정 실패",
        error.response?.data.message ||
          "외박 정보 수정 중 오류가 발생했습니다.",
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
        "외박 정보 삭제 완료",
        "외박 정보가 정상적으로 삭제되었습니다.",
        TOAST_SUCCESS_DURATION,
      );
      router.refresh();
      modal.closeAll();
    },
    onError: (error: AxiosError<Error>) => {
      toast.error(
        "외박 정보 삭제 실패",
        error.response?.data.message ||
          "외박 정보 삭제 중 오류가 발생했습니다.",
        TOAST_ISSUE_DURATION,
      );
    },
  });
};
