"use client";

import PageHeading from "@/components/PageHeading";
import DataTable from "@/components/ui/data-table";
import { ColorColumn } from "@/types/columns";
import { colorColumns } from "./columnDef/color";

interface ColorsTableProps {
  data: ColorColumn[];
}

const ColorsTable = ({ data }: ColorsTableProps) => {
  return (
    <div>
      <PageHeading title="Colors" description="Manage colors for your store" />
      <DataTable columns={colorColumns} data={data} searchKey="name" />
    </div>
  );
};

export default ColorsTable;
