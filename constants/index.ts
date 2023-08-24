import { SidebarLink } from "@/types";
import {
  Gauge,
  LayoutDashboard,
  ShoppingBasket,
  ShoppingBag,
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
];
