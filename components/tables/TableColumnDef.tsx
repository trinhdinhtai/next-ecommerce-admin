import { ColumnDef } from "@tanstack/react-table";
import { CategoryColumn } from "@/types/columns";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const categoryColumns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
