import { SubscriptionPlan } from "@/types"

import { storeSubscriptionPlans } from "@/config/subscriptions"

export function getPlanFeatures(planId?: SubscriptionPlan["id"]) {
  const plan = storeSubscriptionPlans.find((plan) => plan.id === planId)
  const features = plan?.features.map((feature) => feature.split(",")).flat()

  const maxStoreCount =
    features?.find((feature) => feature.match(/store/i))?.match(/\d+/) ?? 0

  const maxProductCount =
    features?.find((feature) => feature.match(/product/i))?.match(/\d+/) ?? 0

  return {
    maxStoreCount,
    maxProductCount,
  }
}
