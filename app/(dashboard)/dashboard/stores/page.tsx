import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getStoresAction } from "@/_actions/store"
import { auth } from "@clerk/nextjs"

import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { buttonVariants } from "@/components/ui/button"
import { Shell } from "@/components/ui/shell"
import StoreCard from "@/components/cards/store-card"
import { Icons } from "@/components/icons"
import PageHeading from "@/components/PageHeading"

export const metadata: Metadata = {
  title: "Stores",
  description: "Manage your stores",
}

export default async function StoresPage() {
  const { userId } = auth()

  if (!userId) redirect("/sign-in")

  const allStores = await getStoresAction({ userId })

  return (
    <Shell>
      <div className="flex space-x-4">
        <div className="flex-1">
          <PageHeading title="Stores" description="Manage store preferences" />
        </div>

        <Link
          href="/dashboard/stores/new"
          className={cn(buttonVariants({ size: "sm" }))}
        >
          Create store
        </Link>
      </div>

      <Alert>
        <Icons.rocket className="h-4 w-4" aria-hidden="true" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can create up to <span className="font-semibold">{3}</span> stores
          and <span className="font-semibold">{100}</span> products on each
          store.
        </AlertDescription>
      </Alert>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allStores.map((store) => (
          <StoreCard
            key={store.id}
            store={store}
            href={`/dashboard/stores/${store.id}`}
          />
        ))}
      </section>
    </Shell>
  )
}
