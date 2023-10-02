"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { statuses } from "@/constants"
import { Table } from "@tanstack/react-table"
import { Plus, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { DataTableExportButton } from "@/components/ui/data-table-export-button"

import { Button, buttonVariants } from "./button"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { DataTableViewOptions } from "./data-table-view-option"
import { Input } from "./input"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  searchKey: keyof TData
}

export function DataTableToolbar<TData>({
  table,
  searchKey,
}: DataTableToolbarProps<TData>) {
  const pathname = usePathname()

  const isFiltered = table.getState().columnFilters.length > 0
  const searchField = String(searchKey)

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

        {table.getColumn("category") && (
          <DataTableFacetedFilter
            column={table.getColumn("category")}
            title="Category"
            options={statuses}
          />
        )}

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
