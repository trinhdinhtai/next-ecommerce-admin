import { SubscriptionPlan } from "@/types"

export const storeSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: "Free",
    name: "Basic",
    description: "Perfect for small businesses that want to sell online.",
    features: ["Create up to 1 store", "Create up to 20 products per store"],
    price: 0,
  },
  {
    id: "Standard",
    name: "Standard",
    description: "Perfect for midsize businesses that want to sell online.",
    features: ["Create up to 2 store", "Create up to 20 products per store"],
    price: 20,
    popular: true,
  },
  {
    id: "Pro",
    name: "Pro",
    description: "Perfect for big businesses that want to sell online.",
    features: ["Create up to 3 stores", "Create up to 20 products per store"],
    price: 40,
  },
  {
    id: "Enterprise",
    name: "Enterprise",
    description: "Perfect for big businesses that want to sell online.",
    features: ["Create unlimited store", "Create unlimited products per store"],
    price: 100,
  },
]
