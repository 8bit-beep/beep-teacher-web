import api from "@/shared/libs/api";
import { AxiosError } from "axios";
import { Error } from "@/shared/types/error";
import { Memo } from "../types";

export const MemoApi = {
  getMemo: async (grade: number) => {
    try {
      return await api.get<Memo>(`/memos/${grade}`);
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      if (axiosError.response?.status === 404) {
        return {
          data: {
            content: "",
            isRead: true,
            exists: false,
          },
        };
      }

      throw error;
    }
  },

  createMemo: async ({ grade, content }: { grade: number; content: string }) => {
    return api.post(`/memos/${grade}`, {
      newContent: content,
    });
  },

  updateMemo: async ({ grade, content }: { grade: number; content: string }) => {
    return api.patch(`/memos/${grade}`, {
      newContent: content,
    });
  },

  markAsRead: async ({ grade, content }: { grade: number; content: string }) => {
    return api.patch(`/memos/${grade}`, {
      newContent: content,
      isRead: true,
    });
  },
};
