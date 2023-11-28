import { NavItem } from "@/types"
import { CreditCard, Store, User } from "lucide-react"

export interface DashboardConfig {
  sidebarNav: NavItem[]
}

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Stores",
      href: "/dashboard/stores",
      icon: Store,
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: CreditCard,
    },
    {
      title: "Account",
      href: "/dashboard/account",
      icon: User,
    },
  ],
}
