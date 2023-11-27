import { getBillboardsByStoreIdAction } from "@/_actions/billboards"

import { Shell } from "@/components/ui/shell"
import AddCategoryForm from "@/components/forms/add-category-form"
import PageHeading from "@/components/PageHeading"

interface NewCategoryPageProps {
  params: {
    storeId: string
  }
}

export default async function NewBillboardPage({
  params,
}: NewCategoryPageProps) {
  const { storeId } = params
  const billboards = await getBillboardsByStoreIdAction(storeId)
  return (
    <Shell>
      <PageHeading title="Add Category" description="Add a new category" />
      <AddCategoryForm storeId={params.storeId} billboards={billboards} />
    </Shell>
  )
}
