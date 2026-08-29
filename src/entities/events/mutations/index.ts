import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@cher1shrxd/toast";
import { useRouter } from "@cher1shrxd/loading";
import { EventApi } from "../api";
import { EventRequestDto } from "../types";
import {
  TOAST_ISSUE_DURATION,
  TOAST_SUCCESS_DURATION,
} from "@/shared/constants/toast";

const useRefreshEvents = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return async () => {
    await queryClient.invalidateQueries({ queryKey: ["events"] });
    router.refresh();
  };
};

export const useCreateEventMutation = () => {
  const refresh = useRefreshEvents();

  return useMutation({
    mutationFn: (data: EventRequestDto) => EventApi.createEvent(data),
    onSuccess: async () => {
      await refresh();
      toast.success("행사 등록 완료", "행사가 등록되었습니다.", TOAST_SUCCESS_DURATION);
    },
    onError: () => {
      toast.error("행사 등록 실패", "잠시 후 다시 시도해주세요.", TOAST_ISSUE_DURATION);
    },
  });
};

export const useUpdateEventMutation = (eventId: number) => {
  const refresh = useRefreshEvents();

  return useMutation({
    mutationFn: (data: EventRequestDto) => EventApi.updateEvent(eventId, data),
    onSuccess: async () => {
      await refresh();
      toast.success("행사 수정 완료", "행사 정보가 수정되었습니다.", TOAST_SUCCESS_DURATION);
    },
    onError: () => {
      toast.error("행사 수정 실패", "잠시 후 다시 시도해주세요.", TOAST_ISSUE_DURATION);
    },
  });
};

export const useDeleteEventMutation = () => {
  const refresh = useRefreshEvents();

  return useMutation({
    mutationFn: (eventId: number) => EventApi.deleteEvent(eventId),
    onSuccess: async () => {
      await refresh();
      toast.success("행사 삭제 완료", "행사가 삭제되었습니다.", TOAST_SUCCESS_DURATION);
    },
    onError: () => {
      toast.error("행사 삭제 실패", "잠시 후 다시 시도해주세요.", TOAST_ISSUE_DURATION);
    },
  });
};
