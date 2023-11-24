"use server"

import { revalidatePath } from "next/cache"
import { auth, currentUser } from "@clerk/nextjs"

import { createSafeAction } from "@/lib/create-safe-action"
import { prisma } from "@/lib/prismadb"
import { stripe } from "@/lib/stripe"
import { getUserEmail } from "@/lib/user"
import { absoluteUrl } from "@/lib/utils"
import {
  StripeRedirectInputType,
  StripeRedirectReturnType,
  stripeRedirectSchema,
} from "@/lib/validations/stripe"

const handler = async (
  _: StripeRedirectInputType
): Promise<StripeRedirectReturnType> => {
  const { userId } = auth()
  const user = await currentUser()

  if (!userId || !user) {
    return {
      error: "Unauthorized",
    }
  }

  const userEmail = getUserEmail(user)

  const billingUrl = absoluteUrl(`/settings/billing`)

  let url = ""

  try {
    const userSubscription = await prisma.userSubscription.findUnique({
      where: {
        userId,
      },
    })

    // If the user is already subscribed to a plan, we redirect them to the Stripe billing portal
    if (userSubscription?.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: billingUrl,
      })

      url = stripeSession.url
    } else {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: billingUrl,
        cancel_url: billingUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: userEmail,
        line_items: [
          {
            price_data: {
              currency: "USD",
              product_data: {
                name: "GMAdmin",
                description: "Unlimited boards for your organization",
              },
              unit_amount: 2000,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          userId,
        },
      })

      url = stripeSession.url ?? ""
    }
  } catch {
    return {
      error: "Something went wrong!",
    }
  }

  revalidatePath(`/settings/billing`)
  return { data: url }
}

export const stripeRedirect = createSafeAction(stripeRedirectSchema, handler)
