import { createFileRoute } from "@tanstack/react-router";
import { Package } from "lucide-react";
import { AppLayout } from "@/components/dashboard/AppLayout";
import { PageHeader } from "@/components/dashboard/PageHeader";

export const Route = createFileRoute("/stock")({
  component: StockPage,
});

const items = [
  { name: "১ নম্বর ইট", qty: 185000, unit: "পিস", value: "৳ ১৫.৭ লক্ষ", level: 92 },
  { name: "২ নম্বর ইট", qty: 96000, unit: "পিস", value: "৳ ৬.৭ লক্ষ", level: 64 },
  { name: "পিকেট ইট", qty: 42000, unit: "পিস", value: "৳ ৪.২ লক্ষ", level: 38 },
  { name: "কাঁচা ইট", qty: 22000, unit: "পিস", value: "—", level: 22 },
  { name: "কয়লা মজুদ", qty: 8.5, unit: "টন", value: "৳ ২.৪ লক্ষ", level: 70 },
  { name: "মাটি মজুদ", qty: 680, unit: "টন", value: "—", level: 55 },
];

const bn = (n: number) => n.toLocaleString("bn-BD");

function StockPage() {
  return (
    <AppLayout>
      <PageHeader icon={Package} title="স্টক ব্যবস্থাপনা" subtitle="ইট, কাঁচামাল ও মজুদের তদারকি" />
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it) => (
          <div key={it.name} className="rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card">
            <div className="flex items-center justify-between">
              <p className="text-base font-bold">{it.name}</p>
              <span className="rounded-full border-2 border-border-strong bg-secondary px-2.5 py-0.5 text-xs font-bold">{it.level}%</span>
            </div>
            <p className="mt-3 text-3xl font-bold tracking-tight">{bn(it.qty)} <span className="text-sm font-medium text-muted-foreground">{it.unit}</span></p>
            <p className="text-sm text-success font-semibold">{it.value}</p>
            <div className="mt-4 h-3 w-full rounded-full border-2 border-border-strong bg-background overflow-hidden">
              <div
                className={`h-full ${it.level > 60 ? "bg-success" : it.level > 30 ? "bg-warning" : "bg-destructive"}`}
                style={{ width: `${it.level}%` }}
              />
            </div>
          </div>
        ))}
      </section>
    </AppLayout>
  );
}
