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