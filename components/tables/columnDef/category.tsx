import Image from "next/image"
import { ColumnDef } from "@tanstack/react-table"

import { CategoryColumn } from "@/types/columns"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import DataTableRowActions from "@/components/ui/data-table-row-actions"

export const categoryColumns: ColumnDef<CategoryColumn>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => {
      return (
        <Image
          width={60}
          height={60}
          src={row.original.imageUrl}
          className="aspect-square rounded-lg object-cover"
          alt="Category Image"
        />
      )
    },
  },
  {
    accessorKey: "billboardLabel",
    header: "Billboard Label",
    cell: ({ row }) => row.original.billboardLabel,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions row={row} entityName="categories" />
    ),
  },
]
