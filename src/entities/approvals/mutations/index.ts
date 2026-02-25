import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Error } from "@/shared/types/error";
import { toast } from "@cher1shrxd/toast";
import { ApprovalApi } from "../api";
import { useRouter } from "@cher1shrxd/loading";
import {
  TOAST_ISSUE_DURATION,
  TOAST_SUCCESS_DURATION,
} from "@/shared/constants/toast";

export const useApproveRoom = (roomId: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => await ApprovalApi.approveRoom(roomId),
    onSuccess: async () => {
      toast.success(
        "승인 처리 완료",
        "승인 처리가 성공적으로 완료되었습니다.",
        TOAST_SUCCESS_DURATION,
      );
      router.refresh();
      await queryClient.refetchQueries({ queryKey: ["approvals", roomId] });
    },
    onError: (error: AxiosError<Error>) => {
      toast.error(
        "승인 처리에 실패했습니다.",
        error.response?.data.message || "네트워크 오류",
        TOAST_ISSUE_DURATION,
      );
    },
  });
};

export const useCancelApproval = (roomId: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => await ApprovalApi.cancelApproval(roomId),
    onSuccess: async () => {
      toast.success(
        "승인 취소 완료",
        "승인 취소가 성공적으로 완료되었습니다.",
        TOAST_SUCCESS_DURATION,
      );
      router.refresh();
      await queryClient.refetchQueries({ queryKey: ["approvals", roomId] });
    },
    onError: (error: AxiosError<Error>) => {
      toast.error(
        "승인 취소에 실패했습니다.",
        error.response?.data.message || "네트워크 오류",
        TOAST_ISSUE_DURATION,
      );
    },
  });
};
