import { getBillboardsByStoreId } from "@/_actions/billboards"
import { format } from "date-fns"

import { BillboardColumn } from "@/types/columns"
import BillboardsTable from "@/components/tables/Billboards"

interface BillboardsPageProps {
  params: {
    storeId: string
  }
}

export default async function BillboardsPage({ params }: BillboardsPageProps) {
  const billboards = await getBillboardsByStoreId(params.storeId)

  const formattedBillboards: BillboardColumn[] = billboards.map(
    (billboard) => ({
      id: billboard.id,
      label: billboard.label,
      imageUrl: billboard.imageUrl,
      createdAt: format(billboard.createdAt, "MMMM do, yyyy"),
    })
  )

  return <BillboardsTable data={formattedBillboards} />
}
