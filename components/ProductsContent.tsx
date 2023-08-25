"use client";

import { useParams, useRouter } from "next/navigation";
import PageHeading from "@/components/PageHeading";
import DataTable from "@/components/ui/data-table";
import { ProductColumn } from "@/types/columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { productColumns } from "@/components/tables/columnDef/product";

interface ProductsContentProps {
  data: ProductColumn[];
}

const ProductsContent = ({ data }: ProductsContentProps) => {
  const params = useParams();
  const router = useRouter();

  return (
    <div>
      <PageHeading
        title="Products"
        description="Manage Products for your store"
      />
      <DataTable
        columns={productColumns}
        data={data}
        actionComponent={
          <Button
            onClick={() => router.push(`/${params.storeId}/products/new`)}
            className="flex gap-1 items-center"
          >
            <Plus />
            Add Product
          </Button>
        }
        searchKey="name"
      />
    </div>
  );
};

export default ProductsContent;
