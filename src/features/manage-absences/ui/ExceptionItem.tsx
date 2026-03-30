"use client";

import { AbsenceCheckpoint } from "@/entities/absences/types";
import { useGetCheckpoints } from "@/entities/checkpoints/queries";
import { CloseIcon } from "@/shared/icons/CloseIcon";
import { Button } from "@bds-web/ui";

interface Props {
  data: Omit<AbsenceCheckpoint, "checkpointName">;
  deleteException: (id: number) => void;
}

const ExceptionItem = ({ data, deleteException }: Props) => {
  const checkpoints = useGetCheckpoints().data.data;
  const checkpointName = checkpoints.find(
    (checkpoint) => checkpoint.id === data.checkpointId,
  )?.name;

  return (
    <div className="w-full flex items-center gap-2 text-body py-1.5 border-b border-greyscale-20">
      <p>{data.date}</p>
      <p>{checkpointName}</p>
      <div className="flex-1" />
      <Button
        buttonSize="small"
        buttonType="text"
        onClick={() => deleteException(data.checkpointId)}
        style={{ padding: 0, minWidth: "auto", height: "auto", color: "var(--color-red-light)" }}
      >
        <CloseIcon />
      </Button>
    </div>
  );
};

export default ExceptionItem;
