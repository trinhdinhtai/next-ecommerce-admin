"use client";

import { Table } from "@tanstack/react-table";

import { Button } from "./button";
import { FileDown } from "lucide-react";
import { downloadToExcel } from "@/lib/excel";

interface DataTableExportButtonProps<TData> {
  table: Table<TData>;
}

export function DataTableExportButton<TData>({
  table,
}: DataTableExportButtonProps<TData>) {
  const rowsData = table.getRowModel().rows.map((row) => row.original);
  const columns = table
    .getAllColumns()
    .filter((column) => typeof column.accessorFn !== "undefined");

  return (
    <Button
      variant="outline"
      size="sm"
      className="ml-auto hidden h-8 lg:flex"
      onClick={() =>
        downloadToExcel({
          rowsData,
          columns,
        })
      }
    >
      <FileDown className="mr-2 h-4 w-4" />
      Export to Excel
    </Button>
  );
}
