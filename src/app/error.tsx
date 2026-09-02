"use client"

import { Button } from "@beep-ds/ui";
import Image from "next/image";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image src="/logo.svg" loading="eager" alt="Logo" width={120} height={120} className="mb-6" />
      <h1 className="text-h2 font-bold mb-2">문제가 발생했습니다</h1>
      <p className="mb-6 text-greyscale-50 text-center">예기치 못한 오류가 발생했습니다.<br />잠시 후 다시 시도해 주세요.</p>
      <Button buttonType="primary" buttonSize="large" onClick={() => window.location.href = "/"}>홈으로 이동</Button>
    </div>
  );
}
