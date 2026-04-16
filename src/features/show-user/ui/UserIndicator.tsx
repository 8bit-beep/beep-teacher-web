"use client";

import { useGetMe } from "@/entities/users/queries";
import OutIcon from "@/shared/icons/OutIcon";
import { useLogout } from "../hooks/useLogout";

const UserIndicator = () => {
  const { data } = useGetMe();
  const { logout } = useLogout();

  return (
    <div className="w-fit xl:w-full flex items-center gap-2 mr-5 lg:mr-4">
      <p className="text-caption1 text-static-black inline-block min-w-9 truncate">{data.name}</p>
      <div className="w-1 xl:flex-1" />
      <button
        onClick={logout}
        className="w-7 p-2 rounded-medium bg-red-light text-static-white">
        <OutIcon size={12} />
      </button>
    </div>
  );
};

export default UserIndicator;
