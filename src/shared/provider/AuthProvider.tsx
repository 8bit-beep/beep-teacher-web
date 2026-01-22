"use client";

import { usePathname } from "next/navigation";
import { getAccessToken } from "../libs/cookie";
import { useEffect } from "react";

const AuthProvider = () => {
  const pathname = usePathname();

  const getToken = async () => {
    const accessToken = await getAccessToken();
    if (!accessToken && typeof window !== "undefined") {
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    getToken();
  }, [pathname]);

  return null;
};

export default AuthProvider;
