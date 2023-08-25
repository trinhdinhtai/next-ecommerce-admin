"use client";

import { useParams, useRouter } from "next/navigation";
import PageHeading from "@/components/PageHeading";
import DataTable from "@/components/ui/data-table";
import { BillboardColumn } from "@/types/columns";
import { Button } from "@/components/ui/button";
import { billboardColumns } from "@/components/tables/columnDef/billboard";
import { Plus } from "lucide-react";

interface CategoriesContentProps {
  data: BillboardColumn[];
}

const BillboardsContent = ({ data }: CategoriesContentProps) => {
  const params = useParams();
  const router = useRouter();

  return (
    <div>
      <PageHeading
        title="Billboards"
        description="Manage billboards for your store"
      />
      <DataTable
        columns={billboardColumns}
        data={data}
        actionComponent={
          <Button
            onClick={() => router.push(`/${params.storeId}/billboards/new`)}
            className="flex gap-1 items-center"
          >
            <Plus />
            Add Billboard
          </Button>
        }
        searchKey="label"
      />
    </div>
  );
};

export default BillboardsContent;
