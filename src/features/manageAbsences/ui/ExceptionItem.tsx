"use client";

import { AbsenceCheckpoint } from "@/entities/absences/types";
import { useGetCheckpoints } from "@/entities/checkpoints/queries";
import { CloseIcon } from "@/shared/icons/CloseIcon";

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
    <div className="w-full flex items-center gap-2 text-body">
      <p>{data.date}</p>
      <p>{checkpointName}</p>
      <div className="flex-1" />
      <button
        onClick={() => deleteException(data.checkpointId)}
        className="text-red-light cursor-pointer">
        <CloseIcon />
      </button>
    </div>
  );
};

export default ExceptionItem;
