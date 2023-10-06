"use client"

import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface StoreSidebarLinksProps {
  storeId: string
}

const StoreSidebarLinks = ({ storeId }: StoreSidebarLinksProps) => {
  const segment = useSelectedLayoutSegment()

  const links = [
    {
      label: "Dashboard",
      href: `/dashboard/stores/${storeId}`,
      icon: Icons.gauge,
      isActive: segment === null,
    },
    {
      label: "Billboards",
      href: `/dashboard/stores/${storeId}/billboards`,
      icon: Icons.monitor,
      isActive: segment === "billboards",
    },
    {
      label: "Categories",
      href: `/dashboard/stores/${storeId}/categories`,
      icon: Icons.layoutDashboard,
      isActive: segment === "categories",
    },
    {
      label: "Products",
      href: `/dashboard/stores/${storeId}/products`,
      icon: Icons.shoppingBasket,
      isActive: segment === "products",
    },
    {
      label: "Sizes",
      href: `/dashboard/stores/${storeId}/sizes`,
      icon: Icons.minimize2,
      isActive: segment === "sizes",
    },
    {
      label: "Colors",
      href: `/dashboard/stores/${storeId}/colors`,
      icon: Icons.palette,
      isActive: segment === "colors",
    },
    {
      label: "Orders",
      href: `/dashboard/stores/${storeId}/orders`,
      icon: Icons.scrollText,
      isActive: segment === "orders",
    },
    {
      label: "Customers",
      href: `/dashboard/stores/${storeId}/customers`,
      icon: Icons.users,
      isActive: segment === "customers",
    },
    {
      label: "APIs",
      href: `/dashboard/stores/${storeId}/api-list`,
      icon: Icons.zap,
      isActive: segment === "api-list",
    },
    {
      label: "Settings",
      href: `/dashboard/stores/${storeId}/settings`,
      icon: Icons.settings,
      isActive: segment === "settings",
    },
  ]

  return (
    <div className="space-y-2">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "mt-8 flex items-center gap-2 px-8 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-sky-700 dark:hover:text-sky-500",
            link.isActive &&
              "border-r-[3px] border-sky-700 bg-sky-200/20 text-sky-700 dark:bg-sky-200/10 dark:text-sky-500"
          )}
        >
          <link.icon></link.icon>
          {link.label}
        </Link>
      ))}
    </div>
  )
}

export default StoreSidebarLinks
