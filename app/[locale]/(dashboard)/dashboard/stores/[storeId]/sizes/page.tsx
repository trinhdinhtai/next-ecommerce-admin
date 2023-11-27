import { getSizesByStoreIdAction } from "@/_actions/sizes"
import { format } from "date-fns"

import { SizeColumn } from "@/types/columns"
import { Shell } from "@/components/ui/shell"
import PageHeading from "@/components/PageHeading"
import SizesTable from "@/components/tables/Sizes"

interface ColorsPageProps {
  params: {
    storeId: string
  }
}

const SizesPage = async ({ params }: ColorsPageProps) => {
  const { storeId } = params
  const sizes = await getSizesByStoreIdAction(storeId)

  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    ...item,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }))

  return (
    <Shell>
      <PageHeading title="Sizes" description="Manage sizes for your store" />
      <SizesTable data={formattedSizes} storeId={storeId} />
    </Shell>
  )
}

export default SizesPage
