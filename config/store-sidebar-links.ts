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
    label: "dashboard",
  },
  {
    icon: LayoutDashboard,
    href: "categories",
    label: "categories",
    entityName: "categories",
    entityId: "categoryId",
  },
  {
    icon: Monitor,
    href: "billboards",
    label: "billboards",
    entityName: "billboards",
    entityId: "billboardId",
  },
  {
    icon: ShoppingBasket,
    href: "products",
    label: "products",
    entityName: "products",
    entityId: "productId",
  },
  {
    icon: Minimize2,
    href: "sizes",
    label: "sizes",
    entityName: "sizes",
    entityId: "sizeId",
  },
  {
    icon: Palette,
    href: "colors",
    label: "colors",
    entityName: "colors",
    entityId: "colorId",
  },
  {
    icon: ScrollText,
    href: "orders",
    label: "orders",
  },
  {
    icon: Users,
    href: "customers",
    label: "customers",
    disable: true,
  },
  {
    icon: Zap,
    href: "api-list",
    label: "api",
  },
  {
    icon: Settings,
    href: "settings",
    label: "settings",
  },
]
