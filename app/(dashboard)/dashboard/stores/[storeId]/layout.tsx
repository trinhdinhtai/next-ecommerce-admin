import { ReactNode } from "react"
import { notFound, redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"

import { prisma } from "@/lib/prismadb"
import StoreSidebar from "@/components/layout/sidebar/store-sidebar"

interface StoreIdLayoutProps {
  children: ReactNode
  params: {
    storeId: string
  }
}

export default async function StoreIdLayout({
  children,
  params,
}: StoreIdLayoutProps) {
  const { userId } = auth()
  const { storeId } = params

  if (!userId) {
    redirect("/sign-in")
  }

  const stores = await prisma.store.findMany({
    select: {
      id: true,
      name: true,
    },
    where: {
      userId,
    },
  })

  const store = stores.find((store) => store.id === storeId)

  if (!store) {
    notFound()
  }

  return (
    <div className="grid grid-cols-[288px_minmax(0,1fr)]">
      <StoreSidebar stores={stores} currentStore={store} />

      <div>{children}</div>
    </div>
  )
}
