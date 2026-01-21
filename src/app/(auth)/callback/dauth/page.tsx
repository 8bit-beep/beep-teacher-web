import { SearchParams } from "@/shared/types/search-params";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DauthCallbackPage({
  searchParams,
}: SearchParams<{ accessToken: string; refreshToken: string }>) {
  const { accessToken, refreshToken } = await searchParams;
  const cookieStore = await cookies();

  cookieStore.set("accessToken", accessToken);
  cookieStore.set("refreshToken", refreshToken);

  redirect("/");
}
