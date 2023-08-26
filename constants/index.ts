import { SidebarLink } from "@/types";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import {
  Gauge,
  LayoutDashboard,
  ShoppingBasket,
  Users,
  Truck,
  Zap,
  Monitor,
  ScrollText,
  CircleIcon,
  Settings,
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
    icon: Monitor,
    href: "billboards",
    label: "Billboards",
  },
  {
    icon: ShoppingBasket,
    href: "products",
    label: "Products",
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
    icon: Truck,
    href: "shipments",
    label: "Shipments",
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
];

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "todo",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
];
