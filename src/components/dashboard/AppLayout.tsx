import type { ReactNode } from "react";
import { Plus } from "lucide-react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { MobileNav } from "@/components/dashboard/MobileNav";
import { Link } from "@tanstack/react-router";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <TopNavbar />
        <div className="flex-1 p-4 md:p-6 pb-24 md:pb-6 space-y-6">{children}</div>

        <Link
          to="/accounts"
          aria-label="দ্রুত হিসাব এন্ট্রি"
          className="md:hidden fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-success bg-primary text-primary-foreground shadow-lg active:translate-y-0.5"
        >
          <Plus className="h-6 w-6" />
        </Link>

        <MobileNav />
      </SidebarInset>
    </SidebarProvider>
  );
}
