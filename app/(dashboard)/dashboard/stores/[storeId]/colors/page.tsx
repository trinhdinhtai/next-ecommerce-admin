import { getColorsByStoreIdAction } from "@/_actions/colors"
import { format } from "date-fns"

import { ColorColumn } from "@/types/columns"
import { prisma } from "@/lib/prismadb"
import { Shell } from "@/components/ui/shell"
import PageHeading from "@/components/PageHeading"
import ColorsTable from "@/components/tables/Colors"

interface ColorsPageProps {
  params: {
    storeId: string
  }
}

const ColorsPage = async ({ params }: ColorsPageProps) => {
  const { storeId } = params
  const colors = await getColorsByStoreIdAction(storeId)

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    ...item,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }))

  return (
    <Shell>
      <PageHeading title="Colors" description="Manage colors for your store" />
      <ColorsTable data={formattedColors} storeId={storeId} />
    </Shell>
  )
}

export default ColorsPage
