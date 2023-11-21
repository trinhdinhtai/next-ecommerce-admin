import { Metadata } from "next"
import Link from "next/link"

import { env } from "@/env.mjs"
import { storeSubscriptionPlans } from "@/config/subscriptions"
import { cn, formatPrice } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Shell } from "@/components/ui/shell"
import { Icons } from "@/components/icons"
import PageHeading from "@/components/PageHeading"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Billing",
  description: "Manage your billing and subscription",
}

export default async function BillingPage() {
  return (
    <Shell>
      <PageHeading
        title="Billing"
        description="Manage your billing and subscription"
      />

      <section className="space-y-5">
        <h2 className="text-xl font-semibold sm:text-2xl">Billing info</h2>
        <Card className="grid gap-4 p-6">
          <h3 className="text-lg font-semibold sm:text-xl">Basic Plan</h3>
          <p className="text-sm text-muted-foreground">
            Upgrade to create more stores and products.
          </p>
        </Card>
      </section>

      <section className="space-y-5 pb-2.5">
        <h2 className="text-xl font-semibold sm:text-2xl">
          Subscription plans
        </h2>

        <RadioGroup
          defaultValue="card"
          className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
          {storeSubscriptionPlans.map((plan) => (
            <div key={plan.id} className="mt-8">
              <RadioGroupItem
                id={plan.id}
                value={plan.id}
                className="peer sr-only"
              />
              <Label
                htmlFor={plan.id}
                className="relative flex flex-col justify-between rounded-md border-2 border-muted bg-popover p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-purple-500 [&:has([data-state=checked])]:border-primary"
              >
                {plan.popular && (
                  <div className="absolute left-1/2 top-0 inline-block -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-3 py-1 text-sm text-white">
                    Popular
                  </div>
                )}

                <p className="text-lg font-semibold sm:text-xl">{plan.name}</p>

                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>

                <div className="mt-6 space-y-6">
                  <div className="text-3xl font-bold">
                    {formatPrice(plan.price, {
                      currency: "USD",
                    })}
                    <span className="text-sm font-normal text-muted-foreground">
                      /month
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <Icons.check className="h-4 w-4" aria-hidden="true" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/dashboard/stores"
                    className={cn(
                      buttonVariants({
                        variant: plan.popular ? "gradient" : "default",
                      }),
                      "w-full"
                    )}
                  >
                    {plan.id === "basic" ? "Get started" : "Upgrade"}
                  </Link>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </section>
    </Shell>
  )
}
