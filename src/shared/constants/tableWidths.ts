const COMPACT_THRESHOLD = 4;

const WIDTHS = {
  dropdown: { default: "180px", compact: "150px" },
  header: { default: "196px", compact: "166px" },
  lastHeader: { default: "220px", compact: "190px" },
} as const;

export function getClassroomTableWidths(checkpointCount: number) {
  const isCompact = checkpointCount >= COMPACT_THRESHOLD;
  return {
    dropdownWidth: isCompact ? WIDTHS.dropdown.compact : WIDTHS.dropdown.default,
    headerWidth: isCompact ? WIDTHS.header.compact : WIDTHS.header.default,
    lastHeaderWidth: isCompact ? WIDTHS.lastHeader.compact : WIDTHS.lastHeader.default,
  };
}