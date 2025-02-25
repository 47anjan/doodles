"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { usePathname } from "next/navigation";

const sidebarNavItems = [
  {
    title: "Account",
    href: "/dashboard/account",
  },
  {
    title: "Favorite",
    href: "/dashboard/favorite",
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar className="pt-16 sm:pt-20">
      <SidebarHeader />
      <SidebarContent>
        <nav className={cn("flex w-full flex-col p-5 gap-2 text-sm")}>
          {sidebarNavItems.map((item) => (
            <Link aria-label={item.title} key={item.href} href={item.href}>
              <span
                className={cn(
                  "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground",
                  pathname === item.href
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground"
                )}
              >
                <span>{item.title}</span>
              </span>
            </Link>
          ))}
        </nav>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
