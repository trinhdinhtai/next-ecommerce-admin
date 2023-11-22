"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { Plus } from "lucide-react"

import {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/types/data-table"
import { cn } from "@/lib/utils"
import DataTableDeleteButton from "@/components/ui/data-table-delete-button"
import { DataTableExportButton } from "@/components/ui/data-table-export-button"
import { DataTableFacetedFilter } from "@/components/ui/data-table-faceted-filter"

import { Button, buttonVariants } from "./button"
import { DataTableViewOptions } from "./data-table-view-option"
import { Input } from "./input"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  searchableColumns?: DataTableSearchableColumn<TData>[]
  filterableColumns?: DataTableFilterableColumn<TData>[]
  deleteRowsAction?: (selectedRowIds: string[]) => void
}

export function DataTableToolbar<TData>({
  table,
  searchableColumns = [],
  filterableColumns = [],
  deleteRowsAction,
}: DataTableToolbarProps<TData>) {
  console.log(
    "file: data-table-toolbar.tsx:31 ~ filterableColumns:",
    filterableColumns
  )
  const pathname = usePathname()

  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {searchableColumns.length > 0 &&
          searchableColumns.map(
            (column) =>
              table.getColumn(column.id ? String(column.id) : "") && (
                <Input
                  key={String(column.id)}
                  placeholder={`Filter ${column.title}...`}
                  value={
                    (table
                      .getColumn(String(column.id))
                      ?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn(String(column.id))
                      ?.setFilterValue(event.target.value)
                  }
                  className="h-8 w-[150px] lg:w-[250px]"
                />
              )
          )}

        {filterableColumns.length > 0 &&
          filterableColumns.map(
            (column) =>
              table.getColumn(column.id ? String(column.id) : "") && (
                <DataTableFacetedFilter
                  key={String(column.id)}
                  column={table.getColumn(column.id ? String(column.id) : "")}
                  title={column.title}
                  options={column.options}
                />
              )
          )}

        {isFiltered && (
          <Button
            aria-label="Reset filters"
            variant="ghost"
            className="h-8 px-2 lg:px-3"
            onClick={() => table.resetColumnFilters()}
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        {deleteRowsAction && table.getSelectedRowModel().rows.length > 0 && (
          <DataTableDeleteButton
            table={table}
            deleteRowsAction={deleteRowsAction}
          />
        )}

        <DataTableExportButton table={table} />
        <DataTableViewOptions table={table} />
        <Link
          className={cn(buttonVariants({ size: "sm" }), "flex h-8 gap-1")}
          href={`${pathname}/new`}
        >
          <Plus className="h-4 w-4" />
          Add
        </Link>
      </div>
    </div>
  )
}
