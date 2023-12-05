import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"

import { env } from "@/env.mjs"
import { prisma } from "@/lib/prismadb"
import { stripe } from "@/lib/stripe"

export async function POST(req: Request) {
  console.log("file: route.ts:10 ~ POST ~ req:", req)
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    )
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  switch (event.type) {
    case "checkout.session.completed": {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      )

      console.log(
        "file: route.ts:34 ~ POST ~ userId:",
        session?.metadata?.userId
      )

      if (!session?.metadata?.userId) {
        return new NextResponse("User id is required", { status: 400 })
      }

      await prisma.userSubscription.create({
        data: {
          userId: session?.metadata?.userId,
          planType: "Standard",
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
        },
      })
      break
    }

    case "invoice.payment_succeeded": {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      )

      await prisma.userSubscription.update({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        data: {
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
        },
      })

      break
    }

    default:
      console.warn(`Unhandled event type: ${event.type}`)
  }

  return new NextResponse(null, { status: 200 })
}
