import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"
import { CheckIcon } from "lucide-react"

import { env } from "@/env.mjs"
import { storeSubscriptionPlans } from "@/config/subscriptions"
import { formatDate } from "@/lib/formatter"
import { prisma } from "@/lib/prismadb"
import { cn, formatPrice } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Shell } from "@/components/ui/shell"
import ManageSubscriptionForm from "@/components/forms/manage-subscription-form"
import { Icons } from "@/components/icons"
import PageHeading from "@/components/PageHeading"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Billing",
  description: "Manage your billing and subscription",
}

export default async function BillingPage() {
  const { userId } = auth()

  if (!userId) {
    return redirect("/sign-in")
  }

  const subscriptionPlan = await prisma.userSubscription.findFirst({
    where: {
      userId,
    },
  })

  return (
    <Shell>
      <PageHeading
        title="Billing"
        description="Manage your billing and subscription"
      />

      <section className="space-y-5">
        <h2 className="text-xl font-semibold sm:text-2xl">Billing info</h2>
        <Card className="grid gap-4 p-6">
          <h3 className="text-lg font-semibold sm:text-xl">
            {subscriptionPlan?.planType ?? "Free"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {subscriptionPlan
              ? "Your plan renews on "
              : "You are currently on the free plan. Upgrading to a paid plan will allow you to create more stores and products."}

            {subscriptionPlan?.stripeCurrentPeriodEnd
              ? `${formatDate(subscriptionPlan.stripeCurrentPeriodEnd)}.`
              : null}
          </p>
        </Card>
      </section>

      <section className="space-y-5 pb-2.5">
        <h2 className="text-xl font-semibold sm:text-2xl">
          Subscription plans
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {storeSubscriptionPlans.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                "relative flex flex-col",
                subscriptionPlan?.planType === plan.id && "border-purple-500"
              )}
            >
              {!storeSubscriptionPlans && plan.popular && (
                <div className="absolute left-1/2 top-0 inline-block -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-3 py-1 text-sm text-white">
                  Popular
                </div>
              )}

              <CardHeader>
                <CardTitle className="line-clamp-1">{plan.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="grid flex-1 place-items-start gap-6">
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
                      <CheckIcon className="h-4 w-4" aria-hidden="true" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="pt-4">
                {plan.id === "Free" ? (
                  <Link
                    href="/dashboard/stores"
                    className={cn(buttonVariants(), "w-full")}
                  >
                    Get started
                  </Link>
                ) : (
                  <ManageSubscriptionForm
                    planId={plan.id}
                    subscription={subscriptionPlan}
                  />
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </Shell>
  )
}
