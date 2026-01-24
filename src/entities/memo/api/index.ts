import api from "@/shared/libs/api"
import { Memo } from "../types"

export const MemoApi = {
  getMemo: async () => {
    return api.get<Memo>("/memos");
  },

  updateMemo: async (newContent: string) => {
    return api.patch("/memos", { content: newContent });
  }
}