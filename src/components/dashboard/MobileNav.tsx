import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Factory, Truck, Wallet, BarChart3 } from "lucide-react";

const items = [
  { url: "/", icon: LayoutDashboard, label: "হোম" },
  { url: "/production", icon: Factory, label: "উৎপাদন" },
  { url: "/delivery", icon: Truck, label: "ডেলিভারি" },
  { url: "/expenses", icon: Wallet, label: "খরচ" },
  { url: "/reports", icon: BarChart3, label: "রিপোর্ট" },
];

export function MobileNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t-2 border-border-strong bg-card shadow-[0_-4px_12px_-4px_rgba(0,0,0,0.08)]">
      <ul className="grid grid-cols-5">
        {items.map((it) => {
          const active = path === it.url;
          return (
            <li key={it.url}>
              <Link
                to={it.url}
                className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-xl border-2 transition-all ${
                    active ? "border-border-strong bg-secondary" : "border-transparent"
                  }`}
                >
                  <it.icon className="h-4.5 w-4.5" />
                </span>
                {it.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
