import api from "@/shared/libs/api";
import { Checkpoint } from "../types";

export const CheckpointApi = {
  getCheckpoints: async () => {
    return await api.get<Checkpoint[]>("/checkpoints");
  },
};