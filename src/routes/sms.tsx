import { createFileRoute } from "@tanstack/react-router";
import { Bell, Send } from "lucide-react";
import { AppLayout } from "@/components/dashboard/AppLayout";
import { PageHeader } from "@/components/dashboard/PageHeader";

export const Route = createFileRoute("/sms")({
  component: SmsPage,
});

const templates = [
  "অর্ডার নিশ্চিতকরণ",
  "ডেলিভারি সম্পন্ন",
  "পেমেন্ট রিমাইন্ডার",
  "শ্রমিক বেতন প্রস্তুত",
];

function SmsPage() {
  return (
    <AppLayout>
      <PageHeader icon={Bell} title="এসএমএস" subtitle="কাস্টমার ও শ্রমিকদের এসএমএস পাঠান" />

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { l: "এই মাসে পাঠানো", v: "১২৪" },
          { l: "অবশিষ্ট ক্রেডিট", v: "৮৭৬" },
          { l: "ডেলিভার রেট", v: "৯৮%" },
          { l: "বাকি রিমাইন্ডার", v: "১৪" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card">
            <p className="text-sm text-muted-foreground">{s.l}</p>
            <p className="mt-1 text-2xl font-bold">{s.v}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card">
          <h3 className="text-lg font-bold border-b-2 border-border-strong pb-3">নতুন এসএমএস</h3>
          <div className="mt-4 space-y-3">
            <div>
              <label className="mb-1.5 block text-sm font-semibold">প্রাপক (মোবাইল)</label>
              <input type="text" placeholder="০১৭xxxxxxxx, ০১৮xxxxxxxx"
                className="h-12 w-full rounded-xl border-2 border-border bg-background px-3 text-sm focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-ring/30" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold">বার্তা</label>
              <textarea rows={5} placeholder="আপনার বার্তা লিখুন..."
                className="w-full rounded-xl border-2 border-border bg-background px-3 py-2 text-sm focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-ring/30" />
            </div>
            <button className="h-12 w-full rounded-xl border-2 border-success bg-primary text-primary-foreground font-bold inline-flex items-center justify-center gap-2 hover:bg-success">
              <Send className="h-4 w-4" /> পাঠান
            </button>
          </div>
        </div>
        <div className="rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card">
          <h3 className="text-lg font-bold border-b-2 border-border-strong pb-3">টেমপ্লেট</h3>
          <ul className="mt-4 space-y-2">
            {templates.map((t) => (
              <li key={t}>
                <button className="w-full text-left rounded-xl border-2 border-border bg-background p-3 hover:border-border-strong text-sm font-semibold">
                  {t}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </AppLayout>
  );
}
