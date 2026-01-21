import { ReactNode } from "react";
import { TableHeader } from "../types/table-header"

interface Props {
  header: TableHeader[];
  rows: ReactNode[][];
}

const Table = ({ header, rows }: Props) => {
  return (
    <div className="w-full h-[calc(100%-114px)]">
      <table className="w-full border-collapse table-auto">
        <thead>
          <tr className="[&_th:first-child]:pl-10 [&_th:last-child]:pr-10">
            {header.map((col, index) => (
              <th
                key={index}
                style={{ width: col.width }}
                className="text-left py-3 bg-blue-light text-static-white text-h4"
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
      </table>
      <div className="w-full h-full overflow-y-auto">
        <table className="w-full border-collapse table-auto">
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="[&_td:first-child]:pl-10 [&_td:last-child]:pr-10">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="h-12 text-h4 text-static-black"
                    style={{ width: header[cellIndex]?.width }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table