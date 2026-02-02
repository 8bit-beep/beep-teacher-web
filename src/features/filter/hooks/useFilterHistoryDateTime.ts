import { useGetCheckpoints } from "@/entities/checkpoints/queries";
import { useCheckpointStore } from "../stores/checkpoint";
import { useDateStore } from "../stores/date";
import { useEffect } from "react";

export const useFilterHistoryDateTime = () => {
  const checkpoints = useGetCheckpoints().data.data;
  const options = checkpoints.map((checkpoint) => ({
    name: checkpoint.name,
    value: `${checkpoint.id}`,
  }));

  const {
    checkpoint: selectedCheckpoint,
    setCheckpoint: setSelectedCheckpoint,
  } = useCheckpointStore();
  const { date: selectedDate, setDate: setSelectedDate } = useDateStore();

  useEffect(() => {
    setSelectedCheckpoint(options[0]);
  }, []);

  return {
    selectedDate,
    setSelectedDate,
    selectedCheckpoint,
    setSelectedCheckpoint,
    options,
  };
};
