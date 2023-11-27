import { Card } from "@/components/ui/card"
import { Shell } from "@/components/ui/shell"
import { Skeleton } from "@/components/ui/skeleton"
import PageHeading from "@/components/PageHeading"

export default function BillingLoading() {
  return (
    <Shell>
      <PageHeading
        title="Billing"
        description="Manage your billing and subscription"
      />

      <section className="space-y-5">
        <h2 className="text-xl font-semibold sm:text-2xl">Billing info</h2>
        <Card className="grid gap-4 p-6">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-5 w-72" />
        </Card>
      </section>

      <section className="space-y-5 pb-2.5">
        <h2 className="text-xl font-semibold sm:text-2xl">
          Subscription plans
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-md border-2 border-muted bg-popover p-6"
            >
              <div className="space-y-1">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>

              <div className="mt-6 space-y-6">
                <Skeleton className="h-9 w-32" />

                <div className="w-full space-y-2">
                  {Array.from({ length: 2 }).map((_, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <Skeleton className="h-4 w-3/5" />
                      <Skeleton className="h-4 w-4/5" />
                    </div>
                  ))}
                </div>

                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </Shell>
  )
}
