"use client";

import PageHeading from "@/components/PageHeading";
import { categoryColumns } from "@/components/tables/columnDef/category";
import DataTable from "@/components/ui/data-table";
import { CategoryColumn } from "@/types/columns";

interface CategoriesTableProps {
  data: CategoryColumn[];
}

const CategoriesTable = ({ data }: CategoriesTableProps) => {
  return (
    <div>
      <PageHeading
        title="Categories"
        description="Manage categories for your store"
      />
      <DataTable columns={categoryColumns} data={data} searchKey="name" />
    </div>
  );
};

export default CategoriesTable;
