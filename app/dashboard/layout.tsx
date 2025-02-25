import { Metadata } from "next";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { SidebarNav } from "./_components/sidebar-nav";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "",
};

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

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <div className="container flex-1 items-start lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <aside
            className={cn(
              "w-full top-[calc(theme('spacing.16')_+_0.1rem)] z-30 hidden border-r lg:sticky lg:block"
            )}
          >
            <ScrollArea className="h-[calc(100vh-8rem)] py-2.5 pr-6">
              <SidebarNav items={sidebarNavItems} className="p-1 pt-4" />
            </ScrollArea>
          </aside>
          <main className="flex w-full flex-col overflow-hidden ">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
