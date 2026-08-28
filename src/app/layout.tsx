import type { Metadata } from "next";
import "./globals.css";
import { BdsRegistry, ModalProvider } from "@beep-ds/ui";
import { LoadingBar } from "@cher1shrxd/loading";
import { colors } from "@beep-ds/colors";
import QueryProvider from "@/shared/provider/QueryProvider";
import { ToastContainer } from "@cher1shrxd/toast";

export const metadata: Metadata = {
  title: "삑 - 실습동 인원 관리 시스템",
  description: "학생 실시간 출석 체크 시스템",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased bg-greyscale-10">
        <LoadingBar color={colors.blue.light} />
        <ToastContainer />
        <BdsRegistry>
          <QueryProvider>
            <ModalProvider />
            {children}
          </QueryProvider>
        </BdsRegistry>
      </body>
    </html>
  );
}
