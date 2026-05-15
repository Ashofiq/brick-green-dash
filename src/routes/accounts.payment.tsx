import { createFileRoute } from "@tanstack/react-router";
import { Send, Banknote, Smartphone, Building2, CreditCard } from "lucide-react";
import { AppLayout } from "@/components/dashboard/AppLayout";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { MoneyEntryForm } from "@/components/dashboard/MoneyEntryForm";

export const Route = createFileRoute("/accounts/payment")({
  component: PaymentPage,
});

const cats = [
  { id: "cash", label: "নগদ", icon: Banknote },
  { id: "bkash", label: "বিকাশ", icon: Smartphone },
  { id: "nagad", label: "নগদ (মোবাইল)", icon: Smartphone },
  { id: "bank", label: "ব্যাংক ট্রান্সফার", icon: Building2 },
  { id: "cheque", label: "চেক", icon: CreditCard },
];

const dueSuppliers = [
  { name: "কয়লা সাপ্লায়ার — রহিম", due: "৮৫,০০০" },
  { name: "মাটি সরবরাহ — জলিল", due: "২৪,০০০" },
  { name: "ট্রাক ভাড়া — বাবুল", due: "১৮,৫০০" },
];

function PaymentPage() {
  return (
    <AppLayout>
      <PageHeader
        icon={Send}
        title="টাকা প্রদান"
        subtitle="সাপ্লায়ার বা পাওনাদারকে টাকা দিন"
      />

      <section className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <MoneyEntryForm
            tone="expense"
            saveLabel="পেমেন্ট সংরক্ষণ করুন"
            partyLabel="কাকে পেমেন্ট"
            partyPlaceholder="যেমন: কয়লা সাপ্লায়ার"
            categories={cats}
            defaultCategory="cash"
          />
        </div>
        <aside className="lg:col-span-2 rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card h-fit">
          <h3 className="border-b-2 border-border-strong pb-3 text-lg font-bold">বাকি সাপ্লায়ার</h3>
          <ul className="mt-4 space-y-3">
            {dueSuppliers.map((c) => (
              <li key={c.name} className="flex items-center justify-between rounded-xl border-2 border-border bg-background p-3">
                <span className="font-semibold">{c.name}</span>
                <span className="font-bold text-destructive">৳ {c.due}</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </AppLayout>
  );
}
