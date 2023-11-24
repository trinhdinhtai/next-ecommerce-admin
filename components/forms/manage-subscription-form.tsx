"use client"

import { SubscriptionPlan } from "@/types"
import { UserSubscription } from "@prisma/client"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import { useAction } from "@/hooks/use-action"
import { Button } from "@/components/ui/button"
import { stripeRedirect } from "@/app/_actions/stripe-redirect"

interface ManageSubscriptionFormProps {
  planId: SubscriptionPlan["id"]
  subscription: UserSubscription | null
}

export default function ManageSubscriptionForm({
  planId,
  subscription,
}: ManageSubscriptionFormProps) {
  const isCurrentPlan = subscription && subscription?.planType === planId
  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const onClick = () => {
    execute({})
  }

  const getButtonText = () => {
    if (isCurrentPlan) return "Mangage"
    if (planId === "Enterprise") return "Contact us"
    return "Upgrade"
  }

  return (
    <Button
      variant={isCurrentPlan ? "gradient" : "default"}
      className="w-full"
      onClick={onClick}
    >
      {isLoading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
      )}
      {getButtonText()}
    </Button>
  )
}
