import { createFileRoute } from "@tanstack/react-router";
import { TrendingDown, Flame, Mountain, Users, Wrench, Truck, Wallet } from "lucide-react";
import { AppLayout } from "@/components/dashboard/AppLayout";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { MoneyEntryForm } from "@/components/dashboard/MoneyEntryForm";
import { TxnList } from "@/components/dashboard/TxnList";

export const Route = createFileRoute("/accounts/expense")({
  component: ExpensePage,
});

const cats = [
  { id: "fuel", label: "জ্বালানি / কয়লা", icon: Flame },
  { id: "soil", label: "মাটি ক্রয়", icon: Mountain },
  { id: "wage", label: "শ্রমিক মজুরি", icon: Users },
  { id: "repair", label: "মেরামত / যন্ত্রাংশ", icon: Wrench },
  { id: "truck", label: "ট্রাক ভাড়া", icon: Truck },
  { id: "other", label: "অন্যান্য খরচ", icon: Wallet },
];

function ExpensePage() {
  return (
    <AppLayout>
      <PageHeader
        icon={TrendingDown}
        title="খরচ যোগ করুন"
        subtitle="টাকা দিলাম — আজকের খরচ সংরক্ষণ করুন"
      />
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        <div className="xl:col-span-2">
          <MoneyEntryForm
            tone="expense"
            saveLabel="খরচ সংরক্ষণ করুন"
            partyLabel="কাকে দিলেন"
            partyPlaceholder="যেমন: কয়লা সাপ্লায়ার"
            categories={cats}
          />
        </div>
        <div className="xl:col-span-3">
          <TxnList kind="expense" title="খরচ তালিকা" />
        </div>
      </div>
    </AppLayout>
  );
}
