import { useRouter } from "@cher1shrxd/loading";
import { useMutation } from "@tanstack/react-query";
import { AbsenceApi } from "../api";
import { toast } from "@cher1shrxd/toast";
import { modal } from "@bds-web/ui";
import { AxiosError } from "axios";
import { Error } from "@/shared/types/error";

export const useCreateAbsenceMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: AbsenceApi.createAbsence,
    onSuccess: (res) => {
      if (res.data.skippedUserIds.length > 0) {
        toast.warning(
          "일부 결석 처리 실패",
          `다음 학생들의 결석 처리에 실패했습니다: ${res.data.skippedUserIds.join(", ")}`,
        );
      } else {
        toast.success(
          "결석 처리 완료",
          "선택한 학생들의 결석이 정상적으로 처리되었습니다.",
        );
      }
      modal.closeAll();
      router.refresh();
    },
    onError: (error: AxiosError<Error>) => {
      toast.error(
        "결석 처리 실패",
        error.response?.data.message || "결석 처리 중 오류가 발생했습니다.",
      );
    },
  });
};
