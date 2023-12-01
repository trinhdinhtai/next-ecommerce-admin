import { Shell } from "@/components/ui/shell"
import { DataTableSkeleton } from "@/components/data-table-skeleton"
import PageHeading from "@/components/PageHeading"

export default function CategoriesLoading() {
  return (
    <Shell>
      <PageHeading
        title="Categories"
        description="Manage categories for your store"
      />

      <DataTableSkeleton columnCount={6} filterableFieldCount={0} />
    </Shell>
  )
}
