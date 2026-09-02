import { Fragment, ReactNode } from "react";
import { DROPDOWN_CLEARANCE } from "@/shared/constants/dropdown";
import { TableRow } from "../types/table-data";
import { TableHeader } from "../types/table-header";

interface Props {
  header: TableHeader[];
  rows: (ReactNode[] | TableRow)[];
  bodyScrollable?: boolean;
}

const theadRow = (header: TableHeader[]) => (
  <tr className="[&_th:first-child]:pl-2 lg:[&_th:first-child]:pl-10 [&_th:last-child]:pr-2 lg:[&_th:last-child]:pr-10">
    {header.map((col, index) => (
      <th
        key={index}
        style={{ width: col?.width }}
        className={`py-3 bg-blue-light text-static-white text-caption1 lg:text-body xl:text-h4 ${
          col.align === "center" ? "text-center" : col.align === "right" ? "text-right" : "text-left"}`}
      >
        {col.title}
      </th>
    ))}
  </tr>
);

const tbodyRows = (header: TableHeader[], rows: (ReactNode[] | TableRow)[]) =>
  rows.length === 0 ? (
    <tr>
      <td colSpan={header.length} className="h-20 text-center text-h4 text-greyscale-40">
        내용이 없습니다.
      </td>
    </tr>
  ) : (
    rows.map((row, rowIndex) => {
      const cells = Array.isArray(row) ? row : row.cells;
      const rowClassName = Array.isArray(row) ? "" : row.className || "";
      const rowHeader = Array.isArray(row) ? undefined : row.rowHeader;
      const defaultBg = rowIndex % 2 === 0 ? "bg-[#EFF8FF]" : "bg-white";
      const hasCustomBg = rowClassName.includes("bg-");
      const baseClassName = `${hasCustomBg ? "" : defaultBg} ${rowClassName}`;

      return (
        <Fragment key={rowIndex}>
          {rowHeader && (
            <tr className={baseClassName}>
              <td colSpan={header.length} className="pt-2 pl-2">
                {rowHeader}
              </td>
            </tr>
          )}
          <tr className={`[&_td:first-child]:pl-2 xl:[&_td:first-child]:pl-10 [&_td:last-child]:pr-2 xl:[&_td:last-child]:pr-10 ${baseClassName}`}>
            {cells.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                style={{ width: header[cellIndex]?.width }}
                className="h-15 text-h4">
                {cell}
              </td>
            ))}
          </tr>
        </Fragment>
      );
    })
  );

const Table = ({ header, rows, bodyScrollable = true }: Props) => {
  if (!bodyScrollable) {
    return (
      <div className={`w-full flex-1 min-h-0 flex flex-col ${DROPDOWN_CLEARANCE}`}>
        <table className="w-full border-collapse table-auto">
          <thead>{theadRow(header)}</thead>
          <tbody>{tbodyRows(header, rows)}</tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="w-full flex-1 min-h-0 flex flex-col">
      <table className="w-full border-collapse table-auto">
        <thead>{theadRow(header)}</thead>
      </table>
      <div className={`w-full flex-1 overflow-y-auto ${DROPDOWN_CLEARANCE}`}>
        <table className="w-full border-collapse table-auto">
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={header.length}
                  className="h-20 text-center text-h4 text-greyscale-40">
                  내용이 없습니다.
                </td>
              </tr>
            ) : (
              rows.map((row, rowIndex) => {
                const cells = Array.isArray(row) ? row : row.cells;
                const rowClassName = Array.isArray(row) ? "" : row.className || "";
                const defaultBg = rowClassName ? "" : rowIndex % 2 === 0 ? "bg-[#EFF8FF]" : "bg-white";

                return (
                  <tr
                    key={rowIndex}
                    className={`[&_td:first-child]:pl-2 xl:[&_td:first-child]:pl-10 [&_td:last-child]:pr-2 xl:[&_td:last-child]:pr-10 ${defaultBg} ${rowClassName}`}>
                    {cells.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        style={{ width: header[cellIndex]?.width }}
                        className="h-15 text-h4">
                        {cell}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
