"use client";

import { Link } from "@cher1shrxd/loading";
import Image from "next/image";
import { useEffect } from "react";

export default function LoginPage() {
  const logout = () => {
    document.cookie = `accessToken=; path=/; max-age=0`;
    document.cookie = `refreshToken=; path=/; max-age=0`;
    window.location.href = "/login";
  }

  useEffect(() => {
    logout();
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-2">
      <div
        className="w-full h-svh flex items-center justify-center bg-[url('/beep-bg.svg')] bg-no-repeat bg-center bg-cover p-8 overflow-visible">
        <div
          className="w-212 h-134 bg-white rounded-xl flex overflow-hidden shadow-modal">
          <div className="w-1/2 h-full bg-[url('/login-bg.svg')] bg-no-repeat bg-center hidden xl:block" />

          <div className="w-full xl:w-1/2 h-full bg-white flex">
            <div className="w-full h-full flex flex-col gap-5 overflow-visible items-center justify-around rounded-xl">
              <div className="flex items-center gap-1 flex-col">
                <Image
                  width={56}
                  height={56}
                  className="w-14"
                  src="logo.svg"
                  alt="logo"
                />
                <p className="text-body text-center text-blue-light">
                  인원체크를 간편하게
                </p>
              </div>
              <button className="w-[80%] flex flex-col justify-center items-center gap-4 bg-[#0083F0] rounded-xl">
                <Link
                  className="w-full py-3 text-white flex gap-4 justify-center items-center rounded-xl self-center cursor-pointer decoration-none"
                  href={`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/dauth`}>
                  <p className="text-body text-base font-semibold text-white">
                    도담도담으로 로그인
                  </p>
                  <Image
                    width={20}
                    height={20}
                    className="w-5"
                    src="/dodam-logo.svg"
                    alt="dodamlogo"
                  />
                </Link>
              </button>
              <div className="w-full h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
