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
    <Link href={path} className={`${pathname === path ? "text-blue-dark" : "text-static-black"} flex flex-col items-center gap-2`}>
      {icon}
      <p className="text-caption1">{label}</p>
    </Link>
  );
};

export default NavItem;
