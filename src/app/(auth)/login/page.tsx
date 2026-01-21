"use client";

import { Button } from "@bds-web/ui";
import { useRouter } from "@cher1shrxd/loading";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-2">
      <Image src="/logo.svg" loading="eager" alt="삑" width={64} height={64} />
      <h1 className="text-h2">삑 어드민 로그인</h1>
      <Button
        buttonSize="large"
        buttonType="primary"
        onClick={() =>
          router.push(
            `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/dauth`,
          )
        }>
        도담도담 로그인
      </Button>
    </div>
  );
}
