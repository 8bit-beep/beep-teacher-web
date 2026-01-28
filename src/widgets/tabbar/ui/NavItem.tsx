"use client";

import { usePathname } from "next/navigation";
import { Link } from "@cher1shrxd/loading";
import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  label: string;
  path: string;
}

const NavItem = ({ icon, label, path }: Props) => {
  const pathname = usePathname();

  return (
    <Link href={path} className={`${pathname === path ? "bg-blue-light text-static-white" : "bg-static-white text-static-black"} w-12 h-12 rounded-medium flex flex-col items-center justify-center gap-1}>
      {icon}
      <p className="text-caption1">{label}</p>
    </Link>
  );
};

export default NavItem;
