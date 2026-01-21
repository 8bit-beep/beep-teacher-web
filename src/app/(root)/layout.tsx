import Sidebar from "@/widgets/sidebar/ui/Sidebar";
import { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="w-full h-screen flex items-start">
      <Sidebar />
      <main className="flex-1 h-full px-13 pt-13 flex flex-col gap-4.5">
        {children}
      </main>
    </div>
  );
}
