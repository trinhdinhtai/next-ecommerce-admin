"use client";

import PageHeading from "@/components/PageHeading";
import DataTable from "@/components/ui/data-table";
import { BillboardColumn } from "@/types/columns";
import { billboardColumns } from "@/components/tables/columnDef/billboard";

interface CategoriesContentProps {
  data: BillboardColumn[];
}

const BillboardsTable = ({ data }: CategoriesContentProps) => {
  return (
    <div>
      <PageHeading
        title="Billboards"
        description="Manage billboards for your store"
      />
      <DataTable columns={billboardColumns} data={data} searchKey="label" />
    </div>
  );
};

export default BillboardsTable;
