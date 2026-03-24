export const isAbsenceStatusName = (name?: string | null) => {
  if (!name) return false;
  return name === "미출석" || name === "결석" || name === "외박";
};

export const isOutStatusName = (name?: string | null) => {
  if (!name) return false;
  return name === "외출";
};
