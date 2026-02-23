import { useRouter } from "@cher1shrxd/loading";
import { useQueryClient } from "@tanstack/react-query";

export const useRefresh = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleRefresh = async () => {
    await queryClient.refetchQueries();
    router.refresh();
  };

  return handleRefresh;
};
