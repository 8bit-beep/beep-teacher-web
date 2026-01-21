"use client";

import CalendarIcon from "@/shared/icons/CalendarIcon";
import LabIcon from "@/shared/icons/LabIcon";
import OkIcon from "@/shared/icons/OkIcon";
import PersonIcon from "@/shared/icons/PersonIcon";
import Image from "next/image";
import NavItem from "./NavItem";
import { Link } from "@cher1shrxd/loading";
import ExcelIcon from "@/shared/icons/ExcelIcon";

const ROUTES = [
  { label: "출석 조회", path: "/", icon: <LabIcon size={16} /> },
  {
    label: "결석자 관리",
    path: "/absences",
    icon: <CalendarIcon size={16} />,
  },
  { label: "실 이동 관리", path: "/shifts", icon: <PersonIcon size={16} /> },
  {
    label: "출석 승인 현황",
    path: "/approvals",
    icon: <OkIcon size={16} />,
  },
  { label: "엑셀 다운로드", path: "/excels", icon: <ExcelIcon size={16} /> },
];

const Sidebar = () => {
  return (
    <aside className="w-[15%] min-w-45 max-w-70 h-screen bg-static-white shadow-modal px-5.5 py-13.75 flex flex-col items-center gap-9">
      <Link href="/">
        <Image
          src="/logo.svg"
          loading="eager"
          width={47}
          height={43}
          alt="삑"
        />
      </Link>
      <nav className="w-full flex flex-col items-start">
        <h2 className="text-greyscale-60 my-0.75 text-caption2">메뉴</h2>
        {ROUTES.map(({ label, path, icon }) => (
          <NavItem icon={icon} label={label} path={path} key={path} />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
