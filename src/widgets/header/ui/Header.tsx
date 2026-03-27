"use client";

import ManageMemo from "@/features/manage-memo/ui/ManageMemo";
import SkeletonUser from "@/features/show-user/ui/SkeletonUser";
import UserIndicator from "@/features/show-user/ui/UserIndicator";
import Image from "next/image";
import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import CreateAbsence from "@/features/manage-absences/ui/CreateAbsence";
import FilterRoom from "@/features/filter/ui/FilterRoom";
import FilterHistoryDateTime from "@/features/filter/ui/FilterHistoryDateTime";
import FilterHistory from "@/features/filter/ui/FilterHistory";
import {Link} from "@cher1shrxd/loading";

const Header = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const floor = searchParams.get("floor");
  
  const headerContent = {
    "/": <FilterRoom param={floor ? Number(floor) : undefined} />,
    "/absences": <CreateAbsence />,
    "/histories":<div className="w-full flex flex-col sm:flex-row gap-5 sm:gap-4">
                  <div className="flex items-center gap-4">
                    <FilterHistoryDateTime />
                  </div>
                  <FilterHistory param={floor ? Number(floor) : undefined} />
                </div>,
    

  }[pathname];

  return (
    <header className="w-full min-h-12.5 flex items-center gap-5 my-4 px-5 lg:px-13.5 xl:hidden">
      <Link href="/?floor=2">
        <Image
          width={40}
          height={40}
          src="/logo.svg"
          alt="logo"
          style={{ width: "auto", height: "auto" }}
        />
      </Link>
      <div className="w-full min-w-0 flex justify-between">
        <div className="hidden lg:flex">{headerContent}</div>
        <ManageMemo />
      </div>
      <Suspense fallback={<SkeletonUser />}>
        <UserIndicator />
      </Suspense>
    </header>
  );
};

export default Header;
