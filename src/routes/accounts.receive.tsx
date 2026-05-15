import { createFileRoute } from "@tanstack/react-router";
import { HandCoins, Banknote, CreditCard, Smartphone, Building2 } from "lucide-react";
import { AppLayout } from "@/components/dashboard/AppLayout";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { MoneyEntryForm } from "@/components/dashboard/MoneyEntryForm";

export const Route = createFileRoute("/accounts/receive")({
  component: ReceivePage,
});

const cats = [
  { id: "cash", label: "নগদ", icon: Banknote },
  { id: "bkash", label: "বিকাশ", icon: Smartphone },
  { id: "nagad", label: "নগদ (মোবাইল)", icon: Smartphone },
  { id: "bank", label: "ব্যাংক ট্রান্সফার", icon: Building2 },
  { id: "cheque", label: "চেক", icon: CreditCard },
];

const dueCustomers = [
  { name: "করিম ট্রেডার্স", due: "৪২,০০০" },
  { name: "হাসান বিল্ডার্স", due: "১,১৫,০০০" },
  { name: "রহমান কনস্ট্রাকশন", due: "৬৮,৫০০" },
];

function ReceivePage() {
  return (
    <AppLayout>
      <PageHeader
        icon={HandCoins}
        title="টাকা গ্রহণ"
        subtitle="কাস্টমার থেকে পাওনা টাকা গ্রহণ করুন"
      />

      <section className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <MoneyEntryForm
            tone="income"
            saveLabel="টাকা গ্রহণ সংরক্ষণ করুন"
            partyLabel="কাস্টমারের নাম"
            partyPlaceholder="যেমন: করিম ট্রেডার্স"
            categories={cats}
            defaultCategory="cash"
          />
        </div>
        <aside className="lg:col-span-2 rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card h-fit">
          <h3 className="border-b-2 border-border-strong pb-3 text-lg font-bold">বাকি কাস্টমার</h3>
          <ul className="mt-4 space-y-3">
            {dueCustomers.map((c) => (
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
