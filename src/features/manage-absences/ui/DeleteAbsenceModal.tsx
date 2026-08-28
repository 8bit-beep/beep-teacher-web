"use client";

import { Button, modal } from "@beep-ds/ui";
import { useDeleteAbsence } from "../hooks/useDeleteAbsence";

interface Props {
  absenceId: number;
}

const DeleteAbsenceModal = ({ absenceId }: Props) => {
  const deleteAbsence = useDeleteAbsence(absenceId);

  return (
    <div className="w-full flex items-center gap-2">
      <Button
        buttonType="text"
        buttonSize="medium"
        onClick={modal.close}
        style={{ flex: 1 }}>
        취소
      </Button>
      <Button
        buttonType="danger"
        buttonSize="medium"
        onClick={deleteAbsence}
        style={{ flex: 1 }}>
        삭제
      </Button>
    </div>
  );
};

export default DeleteAbsenceModal;
