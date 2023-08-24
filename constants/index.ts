import { SidebarLink } from "@/types";
import {
  Gauge,
  LayoutDashboard,
  ShoppingBasket,
  ShoppingBag,
  Users,
  Truck,
  Zap,
} from "lucide-react";

export const SidebarLinks: SidebarLink[] = [
  {
    icon: Gauge,
    href: "",
    label: "Dashboard",
  },
  {
    icon: LayoutDashboard,
    href: "categories",
    label: "Categories",
  },
  {
    icon: ShoppingBasket,
    href: "products",
    label: "Products",
  },
  {
    icon: ShoppingBag,
    href: "orders",
    label: "Orders",
  },
  {
    icon: Users,
    href: "customers",
    label: "Customers",
  },
  {
    icon: Truck,
    href: "shipments",
    label: "Shipments",
  },
  {
    icon: Zap,
    href: "api-list",
    label: "APIs",
  },
];
