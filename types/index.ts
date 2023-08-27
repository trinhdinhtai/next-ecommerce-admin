import { LucideIcon } from "lucide-react";

export type User = {
  firstName: string | null;
  lastName: string | null;
  emailAddress: string;
  imageUrl: string;
  username: string | null;
};

export type EntityName =
  | "categories"
  | "billboards"
  | "products"
  | "sizes"
  | "colors"
  | "orders"
  | "customers"
  | "shipments"
  | "api-list"
  | "settings";

export type SidebarLink = {
  icon: LucideIcon;
  href: string;
  label: string;
  disable?: boolean;
  entityName?: EntityName;
  entityId?: string;
};
