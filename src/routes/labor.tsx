import { createFileRoute } from "@tanstack/react-router";
import { Users, UserPlus, Check, X } from "lucide-react";
import { AppLayout } from "@/components/dashboard/AppLayout";
import { PageHeader } from "@/components/dashboard/PageHeader";

export const Route = createFileRoute("/labor")({
  component: LaborPage,
});

const workers = [
  { name: "করিম মিয়া", role: "পাথান", present: true, days: 22 },
  { name: "রফিক হোসেন", role: "মাটি কাটা", present: true, days: 20 },
  { name: "সালাম শেখ", role: "ভাটা শ্রমিক", present: false, days: 18 },
  { name: "জসিম উদ্দিন", role: "ট্রাক চালক", present: true, days: 24 },
  { name: "নুরুল ইসলাম", role: "পাথান", present: true, days: 21 },
  { name: "আব্দুল হক", role: "ভাটা শ্রমিক", present: false, days: 15 },
];

function LaborPage() {
  return (
    <AppLayout>
      <PageHeader icon={Users} title="শ্রমিক ব্যবস্থাপনা" subtitle="হাজিরা, দল ও কাজের তদারকি"
        actions={<button className="h-11 inline-flex items-center gap-2 rounded-xl border-2 border-success bg-primary px-4 text-sm font-bold text-primary-foreground hover:bg-success"><UserPlus className="h-4 w-4" /> নতুন শ্রমিক</button>} />

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { l: "মোট শ্রমিক", v: "৪৮" },
          { l: "আজ উপস্থিত", v: "৪২" },
          { l: "অনুপস্থিত", v: "৬" },
          { l: "এই মাসের মজুরি", v: "৳ ২.৪ লক্ষ" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card">
            <p className="text-sm text-muted-foreground">{s.l}</p>
            <p className="mt-1 text-2xl font-bold">{s.v}</p>
          </div>
        ))}
      </section>

      <div className="rounded-2xl border-2 border-border-strong bg-card shadow-card overflow-hidden">
        <div className="flex items-center justify-between border-b-2 border-border-strong p-5">
          <h3 className="text-lg font-bold">আজকের হাজিরা</h3>
          <span className="rounded-full border-2 border-border-strong bg-secondary px-3 py-0.5 text-xs font-bold">৪২ / ৪৮</span>
        </div>
        <ul className="divide-y-2 divide-border">
          {workers.map((w) => (
            <li key={w.name} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-border-strong bg-secondary text-sm font-bold text-primary">
                  {w.name.slice(0, 1)}
                </span>
                <div>
                  <p className="font-semibold">{w.name}</p>
                  <p className="text-xs text-muted-foreground">{w.role} • {w.days} দিন</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className={`h-10 w-10 rounded-xl border-2 inline-flex items-center justify-center ${w.present ? "border-success bg-success text-success-foreground" : "border-border bg-background text-muted-foreground"}`}>
                  <Check className="h-5 w-5" />
                </button>
                <button className={`h-10 w-10 rounded-xl border-2 inline-flex items-center justify-center ${!w.present ? "border-destructive bg-destructive text-destructive-foreground" : "border-border bg-background text-muted-foreground"}`}>
                  <X className="h-5 w-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AppLayout>
  );
}
