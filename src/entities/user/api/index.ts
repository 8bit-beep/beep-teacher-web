import api from "@/shared/libs/api";

export const UserApi = {
  getMe: async () => {
    return await api.get("/users/my");
  },
};
