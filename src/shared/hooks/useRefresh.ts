import { useRouter } from "@cher1shrxd/loading";
import { toast } from "@cher1shrxd/toast";
import { useQueryClient } from "@tanstack/react-query";
import { TOAST_SUCCESS_DURATION } from "@/shared/constants/toast";

export const useRefresh = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleRefresh = async () => {
    await queryClient.refetchQueries();
    router.refresh();
    toast.success("새로고침 완료", "데이터가 최신 상태로 업데이트되었습니다.", TOAST_SUCCESS_DURATION);
  };

  return handleRefresh;
};
