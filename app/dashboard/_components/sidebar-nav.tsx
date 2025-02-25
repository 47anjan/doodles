"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn("flex w-full flex-col gap-2 text-sm", className)}
      {...props}
    >
      {items.map((item) => (
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
  );
}
