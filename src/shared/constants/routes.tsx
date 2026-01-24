import CalendarIcon from "../icons/CalendarIcon";
import HistoryIcon from "../icons/HistoryIcon";
import LabIcon from "../icons/LabIcon";
import OkIcon from "../icons/OkIcon";
import PersonIcon from "../icons/PersonIcon";

export const ROUTES = [
  { label: "출석 조회", path: "/", icon: <LabIcon size={20} />, mobileLabel: "출석" },
  {
    label: "결석자 관리",
    path: "/absences",
    icon: <CalendarIcon size={20} />,
    mobileLabel: "결석자"
  },
  { label: "실 이동 관리", path: "/shifts", icon: <PersonIcon size={20} />, mobileLabel: "실 이동" },
  {
    label: "출석 승인 현황",
    path: "/approvals",
    icon: <OkIcon size={20} />,
    mobileLabel: "출석 승인"
  },
  {
    label: "출석 기록 조회",
    path: "/histories",
    icon: <HistoryIcon size={20} />,
    mobileLabel: "출석 기록",
  },
];
