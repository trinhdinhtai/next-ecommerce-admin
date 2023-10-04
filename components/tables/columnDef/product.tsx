import { ColumnDef } from "@tanstack/react-table"

import { ProductColumn } from "@/types/columns"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import DataTableRowActions from "@/components/ui/data-table-row-actions"

export const productColumns: ColumnDef<ProductColumn>[] = [
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
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.color }}
        />
        {row.original.color}
      </div>
    ),
  },
  {
    accessorKey: "inventory",
    header: "Inventory",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
    cell: ({ row }) => <Checkbox checked={row.original.isArchived} disabled />,
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
    cell: ({ row }) => <Checkbox checked={row.original.isFeatured} disabled />,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} entityName="products" />,
  },
]
