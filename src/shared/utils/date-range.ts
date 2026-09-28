export const hasOverlappingDateRange = (
  startDate: string,
  endDate: string,
  targetStartDate: string,
  targetEndDate: string,
) => startDate <= targetEndDate && targetStartDate <= endDate;
