import { createFileRoute } from "@tanstack/react-router";
import { Truck, Plus } from "lucide-react";
import { AppLayout } from "@/components/dashboard/AppLayout";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { DeliveryTable } from "@/components/dashboard/DeliveryTable";

export const Route = createFileRoute("/delivery")({
  component: DeliveryPage,
});

function DeliveryPage() {
  return (
    <AppLayout>
      <PageHeader icon={Truck} title="ট্রাক ডেলিভারি" subtitle="ট্রাক, ড্রাইভার ও ডেলিভারি ট্র্যাকিং"
        actions={<button className="h-11 inline-flex items-center gap-2 rounded-xl border-2 border-success bg-primary px-4 text-sm font-bold text-primary-foreground hover:bg-success"><Plus className="h-4 w-4" /> নতুন ডেলিভারি</button>} />

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { l: "আজকের ডেলিভারি", v: "১৮ ট্রাক" },
          { l: "পেন্ডিং", v: "১৪" },
          { l: "মোট ইট", v: "৯২,০০০" },
          { l: "আদায়", v: "৳ ১.৬ লক্ষ" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card">
            <p className="text-sm text-muted-foreground">{s.l}</p>
            <p className="mt-1 text-2xl font-bold">{s.v}</p>
          </div>
        ))}
      </section>

      <DeliveryTable />
    </AppLayout>
  );
}
