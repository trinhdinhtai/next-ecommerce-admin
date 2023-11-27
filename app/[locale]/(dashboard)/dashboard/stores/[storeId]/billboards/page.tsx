import { getBillboardsByStoreIdAction } from "@/_actions/billboards"
import { format } from "date-fns"

import { BillboardColumn } from "@/types/columns"
import { Shell } from "@/components/ui/shell"
import PageHeading from "@/components/PageHeading"
import BillboardsTable from "@/components/tables/BillboardsDataTable"

interface BillboardsPageProps {
  params: {
    storeId: string
  }
}

export default async function BillboardsPage({ params }: BillboardsPageProps) {
  const { storeId } = params
  const billboards = await getBillboardsByStoreIdAction(storeId)

  const formattedBillboards: BillboardColumn[] = billboards.map(
    (billboard) => ({
      ...billboard,
      createdAt: format(billboard.createdAt, "MMMM do, yyyy"),
    })
  )

  return (
    <Shell>
      <PageHeading
        title="Billboards"
        description="Manage billboards for your store"
      />
      <BillboardsTable data={formattedBillboards} storeId={storeId} />
    </Shell>
  )
}
