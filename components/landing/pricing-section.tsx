"use client"

import Link from "next/link"
import { useScopedI18n } from "@/i18n/client"
import { motion } from "framer-motion"
import { CheckIcon } from "lucide-react"

import { storeSubscriptionPlans } from "@/config/subscriptions"
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

export default function PricingSection() {
  const billingScope = useScopedI18n("landing.billing")

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      viewport={{
        once: true,
      }}
      className="px-10 pb-20"
    >
      <h2 className="mb-10 text-center text-4xl font-extrabold">
        {billingScope("description", {
          highlight: (
            <span className="bg-primary-gradient bg-clip-text text-transparent">
              {billingScope("highlight")}
            </span>
          ),
        })}
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {storeSubscriptionPlans.map((plan) => (
          <Card key={plan.id} className={cn("relative flex flex-col")}>
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
              <Link
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-full bg-gradient-to-tr from-blue-600 to-cyan-600 text-white"
                )}
                href="/settings/billing"
              >
                Get Started
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </motion.section>
  )
}
