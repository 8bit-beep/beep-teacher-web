export const getAccessToken = async (): Promise<string | undefined> => {
  if (typeof window !== "undefined") {
    return document.cookie
      .split("; ")
      .find((c) => c.startsWith("accessToken="))
      ?.split("=")[1];
  }

  const { cookies } = await import("next/headers");
  return (await cookies()).get("accessToken")?.value;
};

export const deleteAuthCookies = async () => {
  if (typeof window !== "undefined") {
    document.cookie =
      "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie =
      "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  } else {
    const cookies = await import("next/headers").then((mod) => mod.cookies);
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
  }
};
