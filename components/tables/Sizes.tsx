"use client";

import PageHeading from "@/components/PageHeading";
import DataTable from "@/components/ui/data-table";
import { SizeColumn } from "@/types/columns";
import { sizeColumns } from "./columnDef/size";

interface SizesTableProps {
  data: SizeColumn[];
}

const SizesTable = ({ data }: SizesTableProps) => {
  return (
    <div>
      <PageHeading title="Sizes" description="Manage sizes for your store" />
      <DataTable columns={sizeColumns} data={data} searchKey="name" />
    </div>
  );
};

export default SizesTable;
