import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, ShoppingCart, Banknote, Truck, Receipt } from "lucide-react";
import { AppLayout } from "@/components/dashboard/AppLayout";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { MoneyEntryForm } from "@/components/dashboard/MoneyEntryForm";
import { TxnList } from "@/components/dashboard/TxnList";

export const Route = createFileRoute("/accounts/income")({
  component: IncomePage,
});

const cats = [
  { id: "sale", label: "ইট বিক্রয়", icon: ShoppingCart },
  { id: "advance", label: "অগ্রিম পেমেন্ট", icon: Banknote },
  { id: "delivery", label: "ডেলিভারি ফি", icon: Truck },
  { id: "other", label: "অন্যান্য আয়", icon: Receipt },
];

function IncomePage() {
  return (
    <AppLayout>
      <PageHeader
        icon={TrendingUp}
        title="আয় যোগ করুন"
        subtitle="টাকা পেলাম — আজকের আয় সংরক্ষণ করুন"
      />
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        <div className="xl:col-span-2">
          <MoneyEntryForm
            tone="income"
            saveLabel="আয় সংরক্ষণ করুন"
            partyLabel="কার কাছ থেকে"
            partyPlaceholder="যেমন: করিম ট্রেডার্স"
            categories={cats}
          />
        </div>
        <div className="xl:col-span-3">
          <TxnList kind="income" title="আয় তালিকা" />
        </div>
      </div>
    </AppLayout>
  );
}
