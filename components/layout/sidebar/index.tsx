import { redirect } from "next/navigation"
import { auth, currentUser } from "@clerk/nextjs"

import { prisma } from "@/lib/prismadb"
import Links from "@/components/layout/sidebar/Links"
import StoreSwitcher from "@/components/StoreSwitcher"

const Sidebar = async () => {
  const user = await currentUser()
  const { userId } = auth()

  if (!user || !userId) {
    redirect("/sign-in")
  }

  const stores = await prisma.store.findMany({
    where: {
      userId,
    },
  })

  return (
    <nav className="flex h-full flex-col overflow-auto border-r bg-background py-5">
      <div className="flex justify-center">
        <StoreSwitcher stores={stores} />
      </div>
      <Links />
    </nav>
  )
}

export default Sidebar
