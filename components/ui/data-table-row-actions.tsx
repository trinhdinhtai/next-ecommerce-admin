"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { EntityName } from "@/types"
import { Row } from "@tanstack/react-table"
import axios from "axios"
import { Copy, Edit, FileDown, MoreHorizontal, Trash } from "lucide-react"
import { toast } from "sonner"

import { exportRowData } from "@/lib/excel"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ConfirmDeleteModal from "@/components/modals/ConfirmDeleteModal"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  entityName: EntityName
}

export function DataTableRowActions<TData>({
  row,
  entityName,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter()
  const params = useParams()

  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const originalRow = row.original
  const getColumnId = () => {
    if (
      typeof originalRow === "object" &&
      originalRow !== null &&
      "id" in originalRow
    ) {
      return String(originalRow.id)
    }
    return undefined
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(getColumnId()!)
    toast.success("Copied to clipboard.")
  }

  const handleUpdate = () => {
    router.push(`/${params.storeId}/${entityName}/${getColumnId()}`)
  }

  const handleDelete = async () => {
    toast.promise(onDeleting(), {
      loading: `Deleting ${entityName} ...`,
      success: "Deleted successfully",
      error: "Make sure you removed all products first",
    })
  }
  const onDeleting = async () => {
    try {
      setIsLoading(true)
      await axios.delete(
        `/api/${params.storeId}/${entityName}/${getColumnId()}`
      )
      router.refresh()
    } catch (error) {
      throw error
    } finally {
      setIsOpen(false)
      setIsLoading(false)
    }
  }

  return (
    <>
      <ConfirmDeleteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDelete}
        isLoading={isLoading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleCopy}>
            <Copy className="mr-2 h-4 w-4" /> Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleUpdate}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              exportRowData({
                rowData: originalRow,
              })
            }
          >
            <FileDown className="mr-2 h-4 w-4" /> Export
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default DataTableRowActions
