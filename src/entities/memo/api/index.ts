import api from "@/shared/libs/api";
import { AxiosResponse } from "axios";
import { Memo } from "../types";

export const MemoApi = {
  getMemo: async (grade: number) => {
    return await api.get<Memo | null, AxiosResponse<Memo | null>>(`/memos/${grade}`, {
      validateStatus: (status) => status === 200 || status === 404,
    });
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
