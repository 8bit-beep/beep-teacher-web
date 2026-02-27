import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HistoryApi } from "../api";
import { toast } from "@cher1shrxd/toast";
import { AxiosError } from "axios";
import { Error } from "@/shared/types/error";
import { useCheckpointStore } from "@/features/filter/stores/checkpoint";
import { useDateStore } from "@/features/filter/stores/date";
import { TOAST_ISSUE_DURATION } from "@/shared/constants/toast";

export const useUpdateHistoryMutation = (roomId: number) => {
  const queryClient = useQueryClient();
  const { date } = useDateStore();
  const { checkpoint } = useCheckpointStore();
  const checkpointId = Number(checkpoint?.value || "1");

  return useMutation({
    mutationFn: async (data: { userId: number; statusId: number }) =>
      await HistoryApi.updateHistory({ ...data, date, checkpointId }),
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["histories", roomId, date, checkpointId],
      });
    },
    onError: (error: AxiosError<Error>) => {
      toast.error(
        "출석 기록 변경 실패",
        error.response?.data.message || "네트워크 오류",
        TOAST_ISSUE_DURATION,
      );
    },
  });
};

export const useDownloadExcel = () => {
  return useMutation({
    mutationFn: HistoryApi.getExcel,
    onError: (error: AxiosError<Error>) => {
      toast.error(
        "엑셀 다운로드 실패",
        error.status === 404
          ? "해당 엑셀 파일을 찾을 수 없습니다."
          : "네트워크 오류",
        TOAST_ISSUE_DURATION,
      );
    },
  });
};
