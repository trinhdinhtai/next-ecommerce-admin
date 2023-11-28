import { notFound } from "next/navigation"

import { prisma } from "@/lib/prismadb"
import { Shell } from "@/components/ui/shell"
import UpdateBillboardForm from "@/components/forms/update-billboard-form"
import PageHeading from "@/components/PageHeading"

interface BillboardIdPageProps {
  params: {
    storeId: string
    billboardId: string
  }
}

const BillboardIdPage = async ({ params }: BillboardIdPageProps) => {
  const billboard = await prisma.billboard.findUnique({
    where: {
      id: params.billboardId,
      storeId: params.storeId,
    },
  })

  if (!billboard) return notFound()

  return (
    <Shell>
      <PageHeading title={billboard.label} description="Edit billboard" />
      <UpdateBillboardForm storeId={params.storeId} billboard={billboard} />
    </Shell>
  )
}

export default BillboardIdPage
