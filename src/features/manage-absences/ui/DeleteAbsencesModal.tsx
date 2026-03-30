"use client";

import { AbsenceApi } from "@/entities/absences/api";
import {
  TOAST_ISSUE_DURATION,
  TOAST_SUCCESS_DURATION,
} from "@/shared/constants/toast";
import { Error } from "@/shared/types/error";
import { toast } from "@cher1shrxd/toast";
import { Button, modal } from "@bds-web/ui";
import { useRouter } from "@cher1shrxd/loading";
import { AxiosError } from "axios";
import { useState } from "react";

interface Props {
  absenceIds: number[];
}

const DeleteAbsencesModal = ({ absenceIds }: Props) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const deleteAbsences = async () => {
    setIsPending(true);

    try {
      await Promise.all(
        absenceIds.map((absenceId) => AbsenceApi.deleteAbsence(absenceId)),
      );

      toast.success(
        "결석 정보 삭제 완료",
        "결석 정보가 정상적으로 삭제되었습니다.",
        TOAST_SUCCESS_DURATION,
      );
      router.refresh();
      modal.closeAll();
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      toast.error(
        "결석 정보 삭제 실패",
        axiosError.response?.data.message ||
          "결석 정보 삭제 중 오류가 발생했습니다.",
        TOAST_ISSUE_DURATION,
      );
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="w-full flex items-center gap-2">
      <Button
        buttonType="text"
        buttonSize="medium"
        onClick={modal.close}
        style={{ flex: 1 }}
      >
        취소
      </Button>
      <Button
        buttonType="danger"
        buttonSize="medium"
        onClick={deleteAbsences}
        disabled={isPending || absenceIds.length === 0}
        style={{ flex: 1 }}
      >
        삭제
      </Button>
    </div>
  );
};

export default DeleteAbsencesModal;
