import { NavItem } from "@/types"

export interface DashboardConfig {
  sidebarNav: NavItem[]
}

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Stores",
      href: "/dashboard/stores",
      icon: "store",
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: "credit",
    },
    {
      title: "Account",
      href: "/dashboard/account",
      icon: "user",
    },
  ],
}
