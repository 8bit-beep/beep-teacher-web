import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MemoApi } from "../api";
import { toast } from "@cher1shrxd/toast";
import { modal } from "@bds-web/ui";
import { AxiosError } from "axios";
import { Error } from "@/shared/types/error";
import {
  TOAST_ISSUE_TIME,
  TOAST_SUCCESS_TIME,
} from "@/shared/constants/toast";

export const useUpdateMemoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: MemoApi.updateMemo,
    onSuccess: async () => {
      toast.success(
        "메모 저장 완료",
        "메모가 성공적으로 저장되었습니다.",
        TOAST_SUCCESS_TIME,
      );
      await queryClient.refetchQueries({ queryKey: ["memos"] });
      modal.closeAll();
    },
    onError: (error: AxiosError<Error>) => {
      toast.error(
        "메모 저장 실패",
        error.response?.data.message ||
          "메모 저장에 실패했습니다. 다시 시도해주세요.",
        TOAST_ISSUE_TIME,
      );
    },
  });
};
