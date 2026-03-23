import { useUpdateMemoMutation } from "@/entities/memo/mutations";
import { useGetMemo } from "@/entities/memo/queries";
import { useState } from "react";

export const useUpdateMemo = (grade: number) => {
  const { data } = useGetMemo(grade);
  const [memo, setMemo] = useState(data.data.content);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(e.target.value);
  };

  const { mutateAsync, isPending } = useUpdateMemoMutation();

  const save = async () => {
    if (data.data.exists === false) {
      await mutateAsync({ grade, content: memo, mode: "create" });
      return;
    }

    await mutateAsync({ grade, content: memo, mode: "update" });
  };

  return {
    memo,
    onChange,
    save,
    isPending,
  };
};
