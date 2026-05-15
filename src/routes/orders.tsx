import { createFileRoute } from "@tanstack/react-router";
import { ShoppingCart, Plus, Phone } from "lucide-react";
import { AppLayout } from "@/components/dashboard/AppLayout";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Badge } from "./production";

export const Route = createFileRoute("/orders")({
  component: OrdersPage,
});

const orders = [
  { id: "#১২৪", customer: "করিম ট্রেডার্স", phone: "০১৭xx", qty: "১০,০০০", price: "৳ ৮৫,০০০", status: "ডেলিভারি বাকি", tone: "warning" as const },
  { id: "#১২৩", customer: "হাসান বিল্ডার্স", phone: "০১৮xx", qty: "২৫,০০০", price: "৳ ২,১২,৫০০", status: "চলমান", tone: "warning" as const },
  { id: "#১২২", customer: "নুরুল কনস্ট্রাকশন", phone: "০১৯xx", qty: "১৫,০০০", price: "৳ ১,২৭,৫০০", status: "সম্পন্ন", tone: "success" as const },
  { id: "#১২১", customer: "আলম এন্টারপ্রাইজ", phone: "০১৬xx", qty: "৮,০০০", price: "৳ ৬৮,০০০", status: "সম্পন্ন", tone: "success" as const },
];

function OrdersPage() {
  return (
    <AppLayout>
      <PageHeader icon={ShoppingCart} title="কাস্টমার অর্ডার" subtitle="অর্ডার গ্রহণ ও পরিচালনা"
        actions={<button className="h-11 inline-flex items-center gap-2 rounded-xl border-2 border-success bg-primary px-4 text-sm font-bold text-primary-foreground hover:bg-success"><Plus className="h-4 w-4" /> নতুন অর্ডার</button>} />

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {orders.map((o) => (
          <div key={o.id} className="rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground">{o.id}</span>
              <Badge tone={o.tone}>{o.status}</Badge>
            </div>
            <p className="mt-2 text-base font-bold">{o.customer}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5"><Phone className="h-3 w-3" /> {o.phone}</p>
            <div className="mt-3 grid grid-cols-2 gap-2 border-t-2 border-border pt-3">
              <div>
                <p className="text-[11px] text-muted-foreground">পরিমাণ</p>
                <p className="text-sm font-bold">{o.qty}</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground">মূল্য</p>
                <p className="text-sm font-bold text-success">{o.price}</p>
              </div>
            </div>
            <button className="mt-4 h-10 w-full rounded-xl border-2 border-border-strong bg-secondary text-sm font-semibold hover:bg-card">
              বিস্তারিত
            </button>
          </div>
        ))}
      </section>
    </AppLayout>
  );
}
