import Header from "@/widgets/header/ui/Header";
import Sidebar from "@/widgets/sidebar/ui/Sidebar";
import Tabbar from "@/widgets/tabbar/ui/Tabbar";
import TabletMemoSection from "@/features/manage-memo/ui/TabletMemoSection";
import { PropsWithChildren, Suspense } from "react";


export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="w-full h-svh flex items-start flex-col pt-12pt-[50px] xl:flex-row xl:p-0">
      <Sidebar />
      <Suspense>
        <Header />
      </Suspense>
      <main className="w-full min-h-0 xl:w-auto flex-1 h-[calc(100%-147px)] overflow-y-auto lg:pb-0 xl:pb-0 xl:h-full xl:px-13 xl:pt-13 flex flex-col gap-4.5">
        {children}
      </main>
      <TabletMemoSection />
      <Tabbar />
    </div>
  );
}
