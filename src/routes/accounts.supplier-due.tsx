import { createFileRoute, Link } from "@tanstack/react-router";
import { Building, Phone, Send, Search } from "lucide-react";
import { AppLayout } from "@/components/dashboard/AppLayout";
import { PageHeader } from "@/components/dashboard/PageHeader";

export const Route = createFileRoute("/accounts/supplier-due")({
  component: SupplierDuePage,
});

const suppliers = [
  { name: "কয়লা সাপ্লায়ার — রহিম", phone: "০১৭১১-৫৫৪৪৩৩", item: "কয়লা", due: 85_000, last: "২ দিন আগে" },
  { name: "মাটি সরবরাহ — জলিল", phone: "০১৮২২-৩৩২২১১", item: "মাটি", due: 24_000, last: "৪ দিন আগে" },
  { name: "ট্রাক ভাড়া — বাবুল", phone: "০১৯১১-৭৭৮৮৯৯", item: "পরিবহন", due: 18_500, last: "৬ দিন আগে" },
  { name: "যন্ত্রাংশ — হোসেন এন্টারপ্রাইজ", phone: "০১৭৩৩-১১২২৩৩", item: "মেরামত", due: 12_000, last: "আজ" },
  { name: "শ্রমিক ঠিকাদার — সালাম", phone: "০১৬৪৪-৪৪৫৫৬৬", item: "মজুরি", due: 32_000, last: "১ দিন আগে" },
];

const bn = (n: number) => n.toLocaleString("bn-BD");

function SupplierDuePage() {
  const totalDue = suppliers.reduce((s, c) => s + c.due, 0);

  return (
    <AppLayout>
      <PageHeader icon={Building} title="সাপ্লায়ার বাকি" subtitle="যাদের টাকা দিতে হবে তাদের তালিকা" />

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { l: "মোট বাকি সাপ্লায়ার", v: bn(suppliers.length) },
          { l: "মোট দেওয়ার টাকা", v: `৳ ${bn(totalDue)}` },
          { l: "জরুরি পরিশোধ", v: "২" },
          { l: "আজ পরিশোধ করা", v: "৳ ২২,০০০" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card">
            <p className="text-sm text-muted-foreground">{s.l}</p>
            <p className="mt-1 text-2xl font-bold">{s.v}</p>
          </div>
        ))}
      </section>

      <div className="rounded-2xl border-2 border-border-strong bg-card shadow-card overflow-hidden">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between border-b-2 border-border-strong p-5">
          <h3 className="text-lg font-bold">বাকি সাপ্লায়ারের তালিকা</h3>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="সাপ্লায়ার খুঁজুন..."
              className="h-10 w-full sm:w-72 rounded-xl border-2 border-border bg-background pl-9 pr-3 text-sm focus:border-border-strong focus:outline-none"
            />
          </div>
        </div>

        <ul className="divide-y-2 divide-border">
          {suppliers.map((c) => (
            <li key={c.name} className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between p-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-border-strong bg-secondary text-base font-bold text-primary">
                  {c.name.slice(0, 1)}
                </span>
                <div className="min-w-0">
                  <p className="font-semibold truncate">{c.name}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Phone className="h-3 w-3" /> {c.phone} • {c.item} • শেষ লেনদেন {c.last}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">দেওয়ার আছে</p>
                  <p className="text-lg font-bold text-destructive">৳ {bn(c.due)}</p>
                </div>
                <Link
                  to="/accounts/payment"
                  className="h-11 inline-flex items-center gap-1.5 rounded-xl border-2 border-success bg-primary px-4 text-sm font-bold text-primary-foreground hover:bg-success"
                >
                  <Send className="h-4 w-4" /> পরিশোধ করুন
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AppLayout>
  );
}
