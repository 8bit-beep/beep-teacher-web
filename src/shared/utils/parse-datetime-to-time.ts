export const parseDatetimeToTime = (datetime: string): string => {
  const date = new Date(datetime);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}