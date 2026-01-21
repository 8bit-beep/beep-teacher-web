"use client";

import { Link } from "@cher1shrxd/loading";
import { usePathname } from "next/navigation";
import { ReactNode } from "react"

interface Props {
  icon: ReactNode;
  label: string;
  path: string;
}

const NavItem = ({ icon, label, path }: Props) => {
  const pathname = usePathname();

  return (
    <Link href={path} className={`w-full h-11 px-2 flex items-center gap-2.5 rounded-small ${pathname === path ? "bg-greyscale-10 text-blue-dark" : "text-static-black"}`}>
      {icon}
      <p className="text-caption2">{label}</p>
    </Link>
  )
}

export default NavItem