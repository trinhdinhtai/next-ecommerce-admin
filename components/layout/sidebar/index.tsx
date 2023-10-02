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
    <nav className="flex h-full flex-col justify-between overflow-auto border-r bg-background px-3 py-5">
      <div className="flex flex-col">
        <StoreSwitcher stores={stores} />
        <Links />
      </div>
    </nav>
  )
}

export default Sidebar
