import { SubscriptionPlan } from "@/types"

export const storeSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: "basic",
    name: "Basic",
    description: "Perfect for small businesses that want to sell online.",
    features: ["Create up to 1 store", "Create up to 20 products"],
    price: 0,
  },
  {
    id: "standard",
    name: "Standard",
    description: "Perfect for midsize businesses that want to sell online.",
    features: ["Create up to 2 store", "Create up to 20 products per store"],
    price: 10,
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    description: "Perfect for big businesses that want to sell online.",
    features: ["Create up to 3 stores", "Create up to 20 products per store"],
    price: 20,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Perfect for big businesses that want to sell online.",
    features: ["Create unlimited store", "Create unlimited products per store"],
    price: 100,
  },
]
