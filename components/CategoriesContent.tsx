"use client";

import { useParams, useRouter } from "next/navigation";
import PageHeading from "@/components/PageHeading";
import { categoryColumns } from "@/components/tables/TableColumnDef";
import DataTable from "@/components/ui/data-table";
import { CategoryColumn } from "@/types/columns";
import { Button } from "@/components/ui/button";
import { Grid, Plus } from "lucide-react";
import CategoryAddIcon from "@/components/icons/CategoryAddIcon";

interface CategoriesContentProps {
  data: CategoryColumn[];
}

const CategoriesContent = ({ data }: CategoriesContentProps) => {
  const params = useParams();
  const router = useRouter();

  return (
    <div>
      <PageHeading
        title="Categories"
        description="Manage categories for your store"
      />
      <DataTable
        columns={categoryColumns}
        data={data}
        actionComponent={
          <Button
            onClick={() => router.push(`/${params.storeId}/categories/new`)}
            className="flex gap-1 items-center"
          >
            <CategoryAddIcon />
            Add Category
          </Button>
        }
      />
    </div>
  );
};

export default CategoriesContent;
