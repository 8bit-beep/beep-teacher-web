"use client";

import { useGetMe } from "@/entities/users/queries";
import OutIcon from "@/shared/icons/OutIcon";
import Image from "next/image";
import { useLogout } from "../hooks/useLogout";
import { Button } from "@bds-web/ui";

const UserIndicator = () => {
  const { data } = useGetMe();
  const { logout } = useLogout();

  return (
    <div className="w-full flex flex-col items-start gap-2">
      <div className="flex items-center gap-2">
        <Image
          src={data.profileImage || "/default-profile.svg"}
          alt="User Profile"
          width={40}
          height={40}
          className="w-6 h-6"
        />
        <p className="text-caption1 text-static-black">
          {data.username} 선생님
        </p>
      </div>

      <Button buttonSize="small" buttonType="danger" style={{ width: "100%" }} onClick={logout}>
        <OutIcon size={12} />
      </Button>
    </div>
  );
};

export default UserIndicator;
