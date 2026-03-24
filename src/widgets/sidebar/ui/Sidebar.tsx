"use client";

import Image from "next/image";
import NavItem from "./NavItem";
import { Link } from "@cher1shrxd/loading";
import { Suspense } from "react";
import UserIndicator from "@/features/show-user/ui/UserIndicator";
import SkeletonUser from "@/features/show-user/ui/SkeletonUser";
import { ROUTES } from "@/shared/constants/routes";
import MemoPanel from "@/features/manage-memo/ui/MemoPanel";

const Sidebar = () => {
  return (
    <aside className="w-[15%] min-w-45 max-w-70 h-screen bg-static-white shadow-modal px-5.5 py-13.75 hidden xl:flex flex-col items-center gap-9">
      <Link href="/?floor=1">
        <Image
          src="/logo.svg"
          loading="eager"
          width={47}
          height={43}
          alt="삑"
        />
      </Link>
      <div className="w-full flex-1 flex flex-col justify-between">
        <nav className="w-full flex flex-col items-start">
          <h2 className="text-greyscale-60 my-0.75 text-caption2">메뉴</h2>
          {ROUTES.map(({ label, path, icon }) => (
            <NavItem icon={icon} label={label} path={path} key={path} />
          ))}
        </nav>
        <div className="w-full flex flex-col gap-4">
          <h2 className="text-greyscale-60 my-0.75 text-caption2">메모</h2>
          <MemoPanel />
        </div>
        <div className="w-full">
          <Suspense fallback={<SkeletonUser />}>
            <UserIndicator />
          </Suspense>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
