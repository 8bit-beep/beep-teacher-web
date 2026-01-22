export const useLogout = () => {
  const logout = () => {
    document.cookie = `accessToken=; path=/; max-age=0`;
    document.cookie = `refreshToken=; path=/; max-age=0`;
    window.location.href = "/login";
  }
  return { logout };
}