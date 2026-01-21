import { useMutation } from "@tanstack/react-query";
import { RoomApi } from "../api";
import { useRouter } from "@cher1shrxd/loading";
import { toast } from "@cher1shrxd/toast";
import { AxiosError } from "axios";
import { Error } from "@/shared/types/error";
import { modal } from "@bds-web/ui";

export const useCreateRoomMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: RoomApi.createRoom,
    onSuccess: () => {
      router.refresh();
      toast.success("실 생성 성공", "실이 성공적으로 생성되었습니다.");
    },
    onError: (error: AxiosError<Error>) => {
      toast.error(
        "실 생성 실패",
        error.response?.data.message ||
          "실 생성에 실패했습니다. 다시 시도해주세요.",
      );
    },
  });
};

export const useDeleteRoomMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: RoomApi.deleteRoom,
    onSuccess: () => {
      router.refresh();
      toast.success("실 삭제 성공", "실이 성공적으로 삭제되었습니다.");
      modal.closeAll();
    },
    onError: (error: AxiosError<Error>) => {
      toast.error(
        "실 삭제 실패",
        error.response?.data.message ||
          "실 삭제에 실패했습니다. 다시 시도해주세요.",
      );
      modal.closeAll();
    },
  });
};

export const useUpdateRoomMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: RoomApi.updateRoom,
    onSuccess: () => {
      router.refresh();
      toast.success("실 수정 성공", "실이 성공적으로 수정되었습니다.");
      modal.closeAll();
    },
    onError: (error: AxiosError<Error>) => {
      toast.error(
        "실 수정 실패",
        error.response?.data.message ||
          "실 수정에 실패했습니다. 다시 시도해주세요.",
      );
      modal.closeAll();
    },
  });
};
