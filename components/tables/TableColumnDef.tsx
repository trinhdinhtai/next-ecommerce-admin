import { ColumnDef } from "@tanstack/react-table";
import { CategoryColumn } from "@/types/columns";

export const categoryColumns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
