import PullToRefresh from "@/shared/ui/PullToRefresh";
import Header from "@/widgets/header/ui/Header";
import Sidebar from "@/widgets/sidebar/ui/Sidebar";
import Tabbar from "@/widgets/tabbar/ui/Tabbar";
import { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="w-full h-svh flex items-start flex-col xl:flex-row pt-[50px] xl:p-0">
      <Sidebar />
      <Header />
      <main className="w-full xl:w-auto flex-1 h-[calc(100%-147px)] px-[54px] xl:h-full xl:px-13 xl:pt-13 flex flex-col gap-4.5">
        {children}
      </main>
      <Tabbar />
    </div>
  );
}
