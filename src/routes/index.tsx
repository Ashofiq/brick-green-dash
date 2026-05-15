import { createFileRoute } from "@tanstack/react-router";
import {
  Factory,
  Layers,
  Truck,
  TrendingUp,
  Wallet,
  Users,
  Flame,
  Mountain,
  Plus,
} from "lucide-react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { StatCard } from "@/components/dashboard/StatCard";
import { ProductionChart } from "@/components/dashboard/ProductionChart";
import { DeliveryTable } from "@/components/dashboard/DeliveryTable";
import { ExpenseForm } from "@/components/dashboard/ExpenseForm";
import { WorkerList } from "@/components/dashboard/WorkerList";
import { MobileNav } from "@/components/dashboard/MobileNav";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

const stats = [
  { icon: Factory, title: "আজকের উৎপাদন", value: "২৮,৪০০", unit: "ইট", change: 12.4, spark: [12, 18, 14, 22, 19, 26, 28], tone: "primary" as const },
  { icon: Layers, title: "মোট ইট স্টক", value: "৩,৪৫,০০০", unit: "পিস", change: 4.2, spark: [200, 220, 240, 260, 280, 300, 345], tone: "success" as const },
  { icon: Truck, title: "পেন্ডিং ডেলিভারি", value: "১৪", unit: "ট্রাক", change: -8.1, spark: [22, 20, 18, 17, 16, 15, 14], tone: "warning" as const },
  { icon: TrendingUp, title: "মোট বিক্রয়", value: "৳ ১২.৪", unit: "লক্ষ", change: 18.6, spark: [6, 7, 8, 9, 10, 11, 12], tone: "primary" as const },
  { icon: Wallet, title: "দৈনিক খরচ", value: "৳ ৪৮,২০০", change: -3.2, spark: [55, 52, 50, 49, 48, 49, 48], tone: "danger" as const },
  { icon: Users, title: "উপস্থিত শ্রমিক", value: "৪২", unit: "/ ৪৮", change: 2.1, spark: [38, 40, 41, 39, 42, 41, 42], tone: "success" as const },
  { icon: Flame, title: "জ্বালানি ব্যবহার", value: "১,২৪০", unit: "কেজি", change: 5.5, spark: [1100, 1150, 1180, 1200, 1220, 1230, 1240], tone: "warning" as const },
  { icon: Mountain, title: "মাটি অবশিষ্ট", value: "৬৮০", unit: "টন", change: -6.4, spark: [900, 850, 820, 780, 740, 710, 680], tone: "primary" as const },
];

function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <TopNavbar />

        <div className="flex-1 p-4 md:p-6 pb-24 md:pb-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">স্বাগতম, রহিম ভাই 👋</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                আজকের ভাটার সংক্ষিপ্ত পরিসংখ্যান এক নজরে দেখুন।
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="h-11 rounded-xl border-2 border-border-strong bg-card px-4 text-sm font-semibold hover:bg-secondary transition-colors">
                রিপোর্ট ডাউনলোড
              </button>
              <button className="h-11 rounded-xl border-2 border-success bg-primary px-5 text-sm font-bold text-primary-foreground shadow-card hover:bg-success transition-colors">
                + নতুন উৎপাদন
              </button>
            </div>
          </div>

          {/* Stat grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <StatCard key={s.title} {...s} />
            ))}
          </section>

          {/* Chart + Expense */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <ProductionChart />
            </div>
            <ExpenseForm />
          </section>

          {/* Delivery + Workers */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <DeliveryTable />
            </div>
            <WorkerList />
          </section>
        </div>

        {/* Floating action button (mobile) */}
        <button
          aria-label="দ্রুত যোগ করুন"
          className="md:hidden fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-success bg-primary text-primary-foreground shadow-lg active:translate-y-0.5"
        >
          <Plus className="h-6 w-6" />
        </button>

        <MobileNav />
      </SidebarInset>
    </SidebarProvider>
  );
}
