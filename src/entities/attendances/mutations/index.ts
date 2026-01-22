import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AttendanceApi } from "../api";
import { AxiosError } from "axios";
import { Error } from "@/shared/types/error";
import { toast } from "@cher1shrxd/toast";

export const useUpdateAttendanceStatus = (roomId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AttendanceApi.updateAttendanceStatus,
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["attendances", roomId] });
    },
    onError: (error: AxiosError<Error>) => {
      toast.error(
        "출석 상태 변경에 실패했습니다.",
        error.response?.data.message || "네트워크 오류",
      );
    },
  });
};
