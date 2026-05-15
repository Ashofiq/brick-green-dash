import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, Download, FileText } from "lucide-react";
import { AppLayout } from "@/components/dashboard/AppLayout";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { ProductionChart } from "@/components/dashboard/ProductionChart";

export const Route = createFileRoute("/reports")({
  component: ReportsPage,
});

const reports = [
  "দৈনিক উৎপাদন রিপোর্ট",
  "মাসিক বিক্রয় রিপোর্ট",
  "শ্রমিক হাজিরা রিপোর্ট",
  "জ্বালানি ব্যবহার রিপোর্ট",
  "লাভ-ক্ষতি বিবরণী",
  "কাস্টমার বকেয়া রিপোর্ট",
  "স্টক রিপোর্ট",
  "ট্রাক ডেলিভারি রিপোর্ট",
];

function ReportsPage() {
  return (
    <AppLayout>
      <PageHeader icon={BarChart3} title="রিপোর্ট" subtitle="সকল প্রকার রিপোর্ট ডাউনলোড ও প্রিন্ট করুন" />

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2"><ProductionChart /></div>
        <div className="rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card">
          <h3 className="text-lg font-bold border-b-2 border-border-strong pb-3">এই মাসের সারাংশ</h3>
          <ul className="mt-4 space-y-3">
            {[
              { l: "মোট উৎপাদন", v: "৮.৪ লক্ষ ইট" },
              { l: "মোট বিক্রয়", v: "৳ ৭২ লক্ষ" },
              { l: "মোট খরচ", v: "৳ ৪৮ লক্ষ" },
              { l: "নিট লাভ", v: "৳ ২৪ লক্ষ" },
            ].map((s) => (
              <li key={s.l} className="flex justify-between rounded-xl border-2 border-border bg-background p-3">
                <span className="text-sm text-muted-foreground">{s.l}</span>
                <span className="font-bold">{s.v}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {reports.map((r) => (
          <div key={r} className="rounded-2xl border-2 border-border-strong bg-card p-4 shadow-card flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-border-strong bg-secondary text-primary">
                <FileText className="h-5 w-5" />
              </span>
              <p className="text-sm font-semibold leading-tight">{r}</p>
            </div>
            <button className="mt-auto h-10 rounded-xl border-2 border-success bg-primary text-primary-foreground text-sm font-bold inline-flex items-center justify-center gap-2 hover:bg-success">
              <Download className="h-4 w-4" /> ডাউনলোড
            </button>
          </div>
        ))}
      </section>
    </AppLayout>
  );
}
