"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Table } from "@tanstack/react-table"
import { Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import DataTableDeleteButton from "@/components/ui/data-table-delete-button"
import { DataTableExportButton } from "@/components/ui/data-table-export-button"

import { buttonVariants } from "./button"
import { DataTableViewOptions } from "./data-table-view-option"
import { Input } from "./input"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  searchKey: keyof TData
  deleteRowsAction?: (selectedRowIds: string[]) => void
}

export function DataTableToolbar<TData>({
  table,
  searchKey,
  deleteRowsAction,
}: DataTableToolbarProps<TData>) {
  const pathname = usePathname()

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
