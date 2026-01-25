"use client";

import { useGetMe } from "@/entities/users/queries";
import OutIcon from "@/shared/icons/OutIcon";
import Image from "next/image";
import { useLogout } from "../hooks/useLogout";

const UserIndicator = () => {
  const { data } = useGetMe();
  const { logout } = useLogout();

  return (
    <div className="flex items-center gap-2">
      <Image
        src={data.profileImage || "/default-profile.svg"}
        alt="User Profile"
        width={40}
        height={40}
        className="w-6 h-6"
      />
      <p className="text-caption1 text-static-black">{data.username}</p>
      <div className="w-1 xl:flex-1" />
      <button
        onClick={logout}
        className="p-2 rounded-medium bg-red-light text-static-white">
        <OutIcon size={12} />
      </button>
    </div>
  );
};

export default UserIndicator;
