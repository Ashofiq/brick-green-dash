import { createFileRoute, Link } from "@tanstack/react-router";
import { UserCheck, Phone, HandCoins, Search } from "lucide-react";
import { AppLayout } from "@/components/dashboard/AppLayout";
import { PageHeader } from "@/components/dashboard/PageHeader";

export const Route = createFileRoute("/accounts/customer-due")({
  component: CustomerDuePage,
});

const customers = [
  { name: "করিম ট্রেডার্স", phone: "০১৭১১-২২৩৩৪৪", total: 2_40_000, paid: 1_98_000, due: 42_000, last: "৩ দিন আগে" },
  { name: "হাসান বিল্ডার্স", phone: "০১৮১২-৫৫৬৬৭৭", total: 4_50_000, paid: 3_35_000, due: 1_15_000, last: "৭ দিন আগে" },
  { name: "রহমান কনস্ট্রাকশন", phone: "০১৯২২-১১২২৩৩", total: 1_80_000, paid: 1_11_500, due: 68_500, last: "১২ দিন আগে" },
  { name: "জাহাঙ্গীর এন্টারপ্রাইজ", phone: "০১৭৩৩-৪৪৫৫৬৬", total: 95_000, paid: 80_000, due: 15_000, last: "আজ" },
  { name: "মোল্লা ব্রিকস", phone: "০১৬৪৪-৯৯৮৮৭৭", total: 3_20_000, paid: 2_85_000, due: 35_000, last: "৫ দিন আগে" },
];

const bn = (n: number) => n.toLocaleString("bn-BD");

function CustomerDuePage() {
  const totalDue = customers.reduce((s, c) => s + c.due, 0);

  return (
    <AppLayout>
      <PageHeader icon={UserCheck} title="কাস্টমার বাকি" subtitle="যারা টাকা দিতে বাকি আছে তাদের তালিকা" />

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { l: "মোট বাকি কাস্টমার", v: bn(customers.length) },
          { l: "মোট বাকি টাকা", v: `৳ ${bn(totalDue)}` },
          { l: "৭+ দিনের পুরোনো", v: "৩" },
          { l: "আজ গ্রহণ করা হয়েছে", v: "৳ ৪৫,০০০" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card">
            <p className="text-sm text-muted-foreground">{s.l}</p>
            <p className="mt-1 text-2xl font-bold">{s.v}</p>
          </div>
        ))}
      </section>

      <div className="rounded-2xl border-2 border-border-strong bg-card shadow-card overflow-hidden">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between border-b-2 border-border-strong p-5">
          <h3 className="text-lg font-bold">বাকি কাস্টমারের তালিকা</h3>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="কাস্টমার খুঁজুন..."
              className="h-10 w-full sm:w-72 rounded-xl border-2 border-border bg-background pl-9 pr-3 text-sm focus:border-border-strong focus:outline-none"
            />
          </div>
        </div>

        <ul className="divide-y-2 divide-border">
          {customers.map((c) => (
            <li key={c.name} className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between p-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-border-strong bg-secondary text-base font-bold text-primary">
                  {c.name.slice(0, 1)}
                </span>
                <div className="min-w-0">
                  <p className="font-semibold truncate">{c.name}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Phone className="h-3 w-3" /> {c.phone} • শেষ লেনদেন {c.last}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">বাকি</p>
                  <p className="text-lg font-bold text-destructive">৳ {bn(c.due)}</p>
                </div>
                <Link
                  to="/accounts/receive"
                  className="h-11 inline-flex items-center gap-1.5 rounded-xl border-2 border-success bg-primary px-4 text-sm font-bold text-primary-foreground hover:bg-success"
                >
                  <HandCoins className="h-4 w-4" /> গ্রহণ করুন
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AppLayout>
  );
}
