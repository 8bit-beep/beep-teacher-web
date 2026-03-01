"use client";

import ManageMemo from "@/features/manage-memo/ui/ManageMemo";
import SkeletonUser from "@/features/show-user/ui/SkeletonUser";
import UserIndicator from "@/features/show-user/ui/UserIndicator";
import Image from "next/image";
import { Suspense } from "react";

const Header = () => {
  return (
    <header className="w-full flex items-center gap-5 my-4 px-[54px] xl:hidden">
      <Image width={40} height={40} src="/logo.svg" alt="logo" />
      <div className="w-full min-w-0 flex justify-between">
        <div></div>
        <ManageMemo />
      </div>
      <Suspense fallback={<SkeletonUser />}>
        <UserIndicator />
      </Suspense>
    </header>
  );
};

export default Header;
