import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
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
  ChevronDown,
  TrendingUp,
  TrendingDown,
  HandCoins,
  Send,
  UserCheck,
  Building,
  ListChecks,
  Receipt,
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
  useSidebar,
} from "@/components/ui/sidebar";

type SubItem = { title: string; url: string; icon: React.ComponentType<{ className?: string }> };
type Item = {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: SubItem[];
};

const items: Item[] = [
  { title: "ড্যাশবোর্ড", url: "/", icon: LayoutDashboard },
  { title: "ইট উৎপাদন", url: "/production", icon: Factory },
  { title: "মাটি ব্যবস্থাপনা", url: "/soil", icon: Mountain },
  { title: "শ্রমিক ব্যবস্থাপনা", url: "/labor", icon: Users },
  { title: "দৈনিক খরচ", url: "/expenses", icon: Wallet },
  { title: "ট্রাক ডেলিভারি", url: "/delivery", icon: Truck },
  { title: "কাস্টমার অর্ডার", url: "/orders", icon: ShoppingCart },
  { title: "স্টক ব্যবস্থাপনা", url: "/stock", icon: Package },
  {
    title: "হিসাব",
    url: "/accounts",
    icon: BookOpen,
    children: [
      { title: "হিসাব সারাংশ", url: "/accounts", icon: BookOpen },
      { title: "অ্যাকাউন্ট তালিকা", url: "/accounts/list", icon: Users },
      { title: "আয় যোগ", url: "/accounts/income", icon: TrendingUp },
      { title: "খরচ যোগ", url: "/accounts/expense", icon: TrendingDown },
      { title: "সব এন্ট্রি", url: "/accounts/transactions", icon: ListChecks },
      { title: "টাকা গ্রহণ", url: "/accounts/receive", icon: HandCoins },
      { title: "টাকা প্রদান", url: "/accounts/payment", icon: Send },
      { title: "কাস্টমার বাকি", url: "/accounts/customer-due", icon: UserCheck },
      { title: "সাপ্লায়ার বাকি", url: "/accounts/supplier-due", icon: Building },
    ],
  },
  {
    title: "রিপোর্ট",
    url: "/reports",
    icon: BarChart3,
    children: [
      { title: "রিপোর্ট সারাংশ", url: "/reports", icon: BarChart3 },
      { title: "খতিয়ান রিপোর্ট", url: "/reports/ledger", icon: BookOpen },
    ],
  },
  { title: "রিসিট ভাউচার", url: "/voucher", icon: Receipt },
  { title: "এসএমএস", url: "/sms", icon: Bell },
  { title: "বেতন", url: "/salary", icon: BadgeDollarSign },
  { title: "সেটিংস", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => ({
    "/accounts": path.startsWith("/accounts"),
  }));

  const toggle = (url: string) =>
    setOpenGroups((p) => ({ ...p, [url]: !p[url] }));

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
                const hasChildren = !!item.children?.length;
                const sectionActive = hasChildren
                  ? path === item.url || path.startsWith(item.url + "/")
                  : path === item.url;
                const isOpen = openGroups[item.url] ?? sectionActive;

                if (hasChildren && !collapsed) {
                  return (
                    <SidebarMenuItem key={item.url}>
                      <button
                        type="button"
                        onClick={() => toggle(item.url)}
                        className={[
                          "flex w-full items-center gap-2 h-11 rounded-xl border-2 px-3 transition-all text-sm",
                          sectionActive
                            ? "border-border-strong bg-secondary text-secondary-foreground font-semibold shadow-card"
                            : "border-transparent hover:border-border hover:bg-secondary/60",
                        ].join(" ")}
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        <span className="flex-1 text-left">{item.title}</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {isOpen && (
                        <ul className="mt-1.5 ml-4 space-y-1 border-l-2 border-border pl-2">
                          {item.children!.map((sub) => {
                            const subActive = path === sub.url;
                            return (
                              <li key={sub.url}>
                                <Link
                                  to={sub.url}
                                  className={[
                                    "flex items-center gap-2 h-9 rounded-lg border-2 px-2.5 text-sm transition-all",
                                    subActive
                                      ? "border-border-strong bg-secondary font-semibold shadow-card"
                                      : "border-transparent text-muted-foreground hover:border-border hover:bg-secondary/60 hover:text-foreground",
                                  ].join(" ")}
                                >
                                  <sub.icon className="h-4 w-4 shrink-0" />
                                  <span>{sub.title}</span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </SidebarMenuItem>
                  );
                }

                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      isActive={sectionActive}
                      tooltip={item.title}
                      className={[
                        "h-11 rounded-xl border-2 px-3 transition-all",
                        sectionActive
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
