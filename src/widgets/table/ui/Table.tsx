import { ReactNode } from "react";
import { TableHeader } from "../types/table-header";

interface Props {
  header: TableHeader[];
  rows: ReactNode[][];
}

const Table = ({ header, rows }: Props) => {
  return (
    <div className="w-full h-full">
      <table className="w-full border-collapse table-auto">
        <thead>
          <tr className="[&_th:first-child]:pl-2 xl:[&_th:first-child]:pl-10 [&_th:last-child]:pr-2 xl:[&_th:last-child]:pr-10">
            {header.map((col, index) => (
              <th
                key={index}
                style={{ width: col?.width }}
                className="text-left py-3 bg-blue-light text-static-white text-caption1 xl:text-h4">
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
      </table>
      <div className="w-full h-full overflow-y-auto">
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
              rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="[&_td:first-child]:pl-2 xl:[&_td:first-child]:pl-10 [&_td:last-child]:pr-2 xl:[&_td:last-child]:pr-10">
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      style={{ width: header[cellIndex]?.width }}
                      className="h-12 text-h4">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
