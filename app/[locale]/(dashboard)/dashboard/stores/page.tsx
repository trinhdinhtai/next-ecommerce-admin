import { Suspense } from "react"
import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getStoresAction } from "@/_actions/store"
import { getScopedI18n } from "@/i18n/server"
import { auth } from "@clerk/nextjs"
import { Rocket } from "lucide-react"

import { env } from "@/env.mjs"
import { getPlanFeatures } from "@/lib/subscription"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { buttonVariants } from "@/components/ui/button"
import { Shell } from "@/components/ui/shell"
import StoreCard from "@/components/cards/store-card"
import PageHeading from "@/components/PageHeading"
import { getSubscriptionPlanAction } from "@/app/_actions/subscription-plan"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Stores",
  description: "Manage your stores",
}

export default async function StoresPage() {
  const storesScope = await getScopedI18n("dashboard.stores")
  const { userId } = auth()

  if (!userId) redirect("/sign-in")

  const [allStores, subscriptionPlan] = await Promise.all([
    getStoresAction({ userId }),
    getSubscriptionPlanAction(userId),
  ])

  const { maxStoreCount, maxProductCount } = getPlanFeatures(
    subscriptionPlan?.planType
  )

  return (
    <Shell>
      <div className="flex space-x-4">
        <div className="flex-1">
          <PageHeading
            title={storesScope("title")}
            description={storesScope("description")}
          />
        </div>

        <Link
          href="/dashboard/stores/new"
          className={cn(buttonVariants({ size: "sm" }))}
        >
          {storesScope("create")}
        </Link>
      </div>

      <Alert>
        <Rocket className="h-4 w-4" aria-hidden="true" />
        <AlertDescription>
          {storesScope("currentPlan", {
            planName: (
              <span className="font-semibold">
                {subscriptionPlan?.planType}
              </span>
            ),
            maxStore: <span className="font-semibold">{maxStoreCount}</span>,
            maxProduct: (
              <span className="font-semibold">{maxProductCount}</span>
            ),
          })}
        </AlertDescription>
      </Alert>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Suspense
          fallback={Array.from({ length: 4 }).map((_, i) => (
            <StoreCard.Skeleton key={i} />
          ))}
        >
          {allStores.map((store) => (
            <StoreCard
              key={store.id}
              store={store}
              href={`/dashboard/stores/${store.id}`}
            />
          ))}
        </Suspense>
      </section>
    </Shell>
  )
}
