export const formatCheckpointNames = (names: string[]): string => {
  if (names.length === 0) return "";
  if (names.length === 1) return names[0];

  const first = names[0];
  const last = names[names.length - 1];

  if (first.endsWith("교시") && last.endsWith("교시")) {
    return `${first.replace("교시", "")}~${last}`;
  }

  return `${first}~${last}`;
};
