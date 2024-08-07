import React, { useState, useEffect } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useTable, useExpanded } from "react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  Column,
  Table,
  ExpandedState,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  // toggleAllRowsExpanded

} from "@tanstack/react-table";

// Define the ReactTableProps type
type ReactTableProps<D extends unknown> = {
  data: D[];
  columns: any;
  headerProps?: {};
  bodyProps?: {};
  rowDataProps?: { className: string };
  [x: string]: any;
};

const ReactTable = <D extends unknown>({
  columns,
  data = [],
  headerProps = {},
  bodyProps = {},
  className = "bg-white",
  rowDataProps = { className: "" },
  ...restConfig
}: ReactTableProps<D>) => {
  const [expanded, setExpanded] = useState<ExpandedState>({});


  const tableConfig = {
    columns,
    data,
    state: { expanded },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    ...restConfig,
  };

  const table = useReactTable(tableConfig);

  useEffect(() => {
    table.toggleAllRowsExpanded(true);
  }, [table]);

  const renderRow = (row, isSubRow = false) => (
    <React.Fragment key={row.id}>
      <tr className={`${rowDataProps.className} ${isSubRow ? "pl-4" : ""}`}>
        {row.getVisibleCells().map((cell) => (
          <td key={cell.id} style={{ paddingLeft: isSubRow ? 20 : 0 }}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>

      {row.getIsExpanded() &&
        row.subRows?.length > 0 &&
        row.subRows.map((subRow) => renderRow(subRow, true))}
    </React.Fragment>
  );

  return (
    <table className={className} style={{ width: "90%" }}>
      <thead {...headerProps}>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} {...(header.column.columnDef.meta || {})}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...bodyProps}>
        {table
          .getRowModel()
          .rows.filter((row) => row.depth === 0)
          .map((row) => renderRow(row))}
      </tbody>
    </table>
  );
};

export { ReactTable };
