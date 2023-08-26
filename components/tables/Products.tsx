"use client";

import PageHeading from "@/components/PageHeading";
import DataTable from "@/components/ui/data-table";
import { ProductColumn } from "@/types/columns";
import { productColumns } from "@/components/tables/columnDef/product";

interface ProductsTableProps {
  data: ProductColumn[];
}

const ProductsTable = ({ data }: ProductsTableProps) => {
  return (
    <div>
      <PageHeading
        title="Products"
        description="Manage Products for your store"
      />
      <DataTable columns={productColumns} data={data} searchKey="name" />
    </div>
  );
};

export default ProductsTable;
