"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { SidebarLinks } from "@/constants";
import { SidebarLink } from "@/types";
import { cn } from "@/lib/utils";

const Links = () => {
  const params = useParams();
  const pathname = usePathname();

  const isActive = (link: SidebarLink) => {
    if (link.href === "") {
      return pathname === `/${params.storeId}`;
    }
    return pathname === `/${params.storeId}/${link.href}`;
  };

  return (
    <div className="space-y-2">
      {SidebarLinks.map((link) => (
        <Link
          key={link.href}
          href={`/${params.storeId}/${link.href}`}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary px-5 py-3 rounded-md flex items-center gap-2 mt-8",
            isActive(link)
              ? "text-black bg-white dark:bg-gray-900 dark:text-white"
              : "text-muted-foreground"
          )}
        >
          <link.icon></link.icon>
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default Links;
