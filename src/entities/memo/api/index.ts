import api from "@/shared/libs/api";
import { Memo } from "../types";

export const MemoApi = {
  getMemo: async (grade: number) => {
    try {
      return await api.get<Memo>(`/memos/${grade}`);
    } catch (error) {
      throw error;
    }
  },

  createMemo: async ({ grade, content }: { grade: number; content: string }) => {
    return api.post(`/memos/${grade}`, {
      content,
    });
  },

  updateMemo: async ({
    grade,
    content,
    isRead,
  }: {
    grade: number;
    content: string;
    isRead?: boolean;
  }) => {
    return api.patch(`/memos/${grade}`, {
      newContent: content,
      ...(typeof isRead === "boolean" ? { isRead } : {}),
    });
  },

  markAsRead: async ({ grade, content }: { grade: number; content: string }) => {
    return api.patch(`/memos/${grade}`, {
      content,
      isRead: true,
    });
  },
};
