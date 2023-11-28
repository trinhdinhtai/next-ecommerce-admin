"use client"

import { Table } from "@tanstack/react-table"
import { Trash } from "lucide-react"

import { Button } from "./button"

interface DataTableDeleteButtonProps<TData> {
  table: Table<TData>
  deleteRowsAction: (selectedRowIds: string[]) => void
}

export default function DataTableDeleteButton<TData>({
  table,
  deleteRowsAction,
}: DataTableDeleteButtonProps<TData>) {
  const handleClick = () => {
    table.toggleAllPageRowsSelected(false)

    const selectedRowIds = table
      .getSelectedRowModel()
      .rows.map((row) => {
        const originalRow = row.original
        if (
          typeof originalRow === "object" &&
          originalRow !== null &&
          "id" in originalRow
        ) {
          return String(originalRow.id)
        }
        return undefined
      })
      .filter(Boolean)
      .map(String)

    deleteRowsAction(selectedRowIds)
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      className="ml-auto hidden h-8 lg:flex"
      onClick={handleClick}
    >
      <Trash className="mr-2 h-4 w-4" />
      Delete
    </Button>
  )
}
