"use client";

import { usePathname } from "next/navigation";
import { getAccessToken } from "../libs/cookie";
import { useEffect } from "react";
import { useRouter } from "@cher1shrxd/loading";

const AuthProvider = () => {
  const pathname = usePathname();
  const router = useRouter();

  const getToken = async () => {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      router.replace("/login");
    }
  };

  useEffect(() => {
    getToken();
  }, [pathname]);

  return null;
};

export default AuthProvider;
