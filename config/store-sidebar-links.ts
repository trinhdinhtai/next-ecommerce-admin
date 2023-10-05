import { SidebarLink } from "@/types"
import {
  Gauge,
  LayoutDashboard,
  Minimize2,
  Monitor,
  Palette,
  ScrollText,
  Settings,
  ShoppingBasket,
  Users,
  Zap,
} from "lucide-react"

export const StoreSidebarLinks: SidebarLink[] = [
  {
    icon: Gauge,
    href: "",
    label: "Dashboard",
  },
  {
    icon: LayoutDashboard,
    href: "categories",
    label: "Categories",
    entityName: "categories",
    entityId: "categoryId",
  },
  {
    icon: Monitor,
    href: "billboards",
    label: "Billboards",
    entityName: "billboards",
    entityId: "billboardId",
  },
  {
    icon: ShoppingBasket,
    href: "products",
    label: "Products",
    entityName: "products",
    entityId: "productId",
  },
  {
    icon: Minimize2,
    href: "sizes",
    label: "Sizes",
    entityName: "sizes",
    entityId: "sizeId",
  },
  {
    icon: Palette,
    href: "colors",
    label: "Colors",
    entityName: "colors",
    entityId: "colorId",
  },
  {
    icon: ScrollText,
    href: "orders",
    label: "Orders",
  },
  {
    icon: Users,
    href: "customers",
    label: "Customers",
    disable: true,
  },
  {
    icon: Zap,
    href: "api-list",
    label: "APIs",
  },
  {
    icon: Settings,
    href: "settings",
    label: "Settings",
  },
]
