export const pad = (num: number, size: number): string => {
  let s = num.toString();
  while (s.length < size) s = "0" + s;
  return s;
}