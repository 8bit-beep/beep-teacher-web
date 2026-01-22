import { useRouter } from "@cher1shrxd/loading";
import { useMutation } from "@tanstack/react-query";
import { ShiftApi } from "../api";
import { AxiosError } from "axios";
import { Error } from "@/shared/types/error";
import { toast } from "@cher1shrxd/toast";
import { ShiftStatus } from "../types";

export const useUpdateShiftStatus = (shiftId: number) => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (status: ShiftStatus) => await ShiftApi.updateShiftStatus(shiftId, status),
    onSuccess: () => {
      router.refresh();
    },
    onError: (error: AxiosError<Error>) => {
      toast.error(
        "근무 상태 변경에 실패했습니다.",
        error.response?.data.message || "네트워크 오류",
      );
    },
  });
}