"use client";

import ManageMemo from "@/features/manageMemo/ui/ManageMemo";
import SkeletonUser from "@/features/showUser/ui/SkeletonUser";
import UserIndicator from "@/features/showUser/ui/UserIndicator";
import Image from "next/image";
import { Suspense } from "react";

const Header = () => {
  return (
    <header className="w-full flex items-center gap-4 my-4 px-2 xl:hidden">
      <Image width={40} height={40} src="/logo.svg" alt="logo" />
      <ManageMemo />
      <div className="flex-1" />
      <Suspense fallback={<SkeletonUser />}>
        <UserIndicator />
      </Suspense>
    </header>
  );
};

export default Header;
