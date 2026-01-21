import { Button } from "@bds-web/ui";
import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image src="/logo.svg" loading="eager" alt="Logo" width={120} height={120} className="mb-6" />
      <h1 className="text-h2 font-bold mb-2">페이지를 찾을 수 없습니다</h1>
      <p className="mb-6 text-greyscale-50 text-center">요청하신 페이지가 존재하지 않거나<br />이동되었을 수 있습니다.</p>
      <Link href="/">
        <Button buttonType="primary" buttonSize="large">홈으로 이동</Button>
      </Link>
    </div>
  );
}
