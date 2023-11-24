import { z } from "zod"

import { ActionState } from "@/lib/create-safe-action"

export const stripeRedirectSchema = z.object({})

export type StripeRedirectInputType = z.infer<typeof stripeRedirectSchema>
export type StripeRedirectReturnType = ActionState<
  StripeRedirectInputType,
  string
>
