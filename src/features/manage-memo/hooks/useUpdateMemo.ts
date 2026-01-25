import { useUpdateMemoMutation } from "@/entities/memo/mutations";
import { useGetMemo } from "@/entities/memo/queries";
import { useState } from "react";

export const useUpdateMemo = () => {
  const { data } = useGetMemo();
  const [memo, setMemo] = useState(data.data.content);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(e.target.value);
  };

  const { mutateAsync, isPending } = useUpdateMemoMutation();

  const save = async () => {
    await mutateAsync(memo);
  };

  return {
    memo,
    onChange,
    save,
    isPending,
  };
};
