import { ReactNode } from "react";

export interface TableData {
  data: ReactNode[];
}

export interface TableRow {
  cells: ReactNode[];
  className?: string;
}
