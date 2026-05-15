import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Factory,
  Mountain,
  Users,
  Wallet,
  Truck,
  ShoppingCart,
  Package,
  BookOpen,
  BarChart3,
  Bell,
  BadgeDollarSign,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  { title: "ড্যাশবোর্ড", en: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "ইট উৎপাদন", en: "Brick Production", url: "/production", icon: Factory },
  { title: "মাটি ব্যবস্থাপনা", en: "Soil Management", url: "/soil", icon: Mountain },
  { title: "শ্রমিক ব্যবস্থাপনা", en: "Labor", url: "/labor", icon: Users },
  { title: "দৈনিক খরচ", en: "Daily Expenses", url: "/expenses", icon: Wallet },
  { title: "ট্রাক ডেলিভারি", en: "Truck Delivery", url: "/delivery", icon: Truck },
  { title: "কাস্টমার অর্ডার", en: "Orders", url: "/orders", icon: ShoppingCart },
  { title: "স্টক ব্যবস্থাপনা", en: "Stock", url: "/stock", icon: Package },
  { title: "হিসাব সারাংশ", en: "Accounts", url: "/accounts", icon: BookOpen },
  { title: "রিপোর্ট", en: "Reports", url: "/reports", icon: BarChart3 },
  { title: "এসএমএস", en: "SMS", url: "/sms", icon: Bell },
  { title: "বেতন", en: "Salary", url: "/salary", icon: BadgeDollarSign },
  { title: "সেটিংস", en: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <Sidebar collapsible="icon" className="border-r-2 border-border-strong">
      <SidebarHeader className="border-b-2 border-border-strong px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-border-strong bg-primary text-primary-foreground shadow-card">
            <Factory className="h-5 w-5" />
          </div>
          <div className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
            <span className="text-base font-bold text-foreground">ইট ভাটা</span>
            <span className="text-xs text-muted-foreground">ম্যানেজমেন্ট</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            মূল মেনু
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {items.map((item) => {
                const active = path === item.url;
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.title}
                      className={[
                        "h-11 rounded-xl border-2 px-3 transition-all",
                        active
                          ? "border-border-strong bg-secondary text-secondary-foreground font-semibold shadow-card"
                          : "border-transparent hover:border-border hover:bg-secondary/60",
                      ].join(" ")}
                    >
                      <Link to={item.url}>
                        <item.icon className="h-5 w-5 shrink-0" />
                        <span className="text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
