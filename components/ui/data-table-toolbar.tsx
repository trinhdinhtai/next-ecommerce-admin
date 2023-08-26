"use client";

import { Plus, X } from "lucide-react";
import { Table } from "@tanstack/react-table";

import { Input } from "./input";
import { Button } from "./button";
import { DataTableViewOptions } from "./data-table-view-option";
import { usePathname, useRouter } from "next/navigation";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchKey: keyof TData;
}

export function DataTableToolbar<TData>({
  table,
  searchKey,
}: DataTableToolbarProps<TData>) {
  const router = useRouter();
  const pathname = usePathname();

  const isFiltered = table.getState().columnFilters.length > 0;
  const searchField = String(searchKey);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={`Filter by ${searchField}...`}
          value={
            (table.getColumn(searchField)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(searchField)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <DataTableViewOptions table={table} />
        <Button
          size="sm"
          className="h-8 flex gap-1"
          onClick={() => router.push(`${pathname}/new`)}
        >
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>
    </div>
  );
}
