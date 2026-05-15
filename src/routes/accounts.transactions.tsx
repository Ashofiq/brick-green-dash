import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { AppLayout } from "@/components/dashboard/AppLayout";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { TxnList } from "@/components/dashboard/TxnList";
import { useTxns, bn } from "@/lib/txn-store";

export const Route = createFileRoute("/accounts/transactions")({
  component: TxnPage,
});

function TxnPage() {
  const { list } = useTxns();
  const income = list.filter((t) => t.kind === "income").reduce((s, t) => s + t.amount, 0);
  const expense = list.filter((t) => t.kind === "expense").reduce((s, t) => s + t.amount, 0);
  const net = income - expense;

  return (
    <AppLayout>
      <PageHeader
        icon={ListChecks}
        title="সব এন্ট্রি"
        subtitle="আয়/খরচ দেখুন, এডিট ও ডিলিট করুন"
      />
      <section className="grid grid-cols-3 gap-3">
        <Stat label="মোট আয়" value={`৳ ${bn(income)}`} tone="text-success" />
        <Stat label="মোট খরচ" value={`৳ ${bn(expense)}`} tone="text-destructive" />
        <Stat label="নিট" value={`৳ ${bn(net)}`} tone="text-primary" />
      </section>
      <TxnList />
    </AppLayout>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="rounded-2xl border-2 border-border-strong bg-card p-4 shadow-card">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`mt-1 text-xl md:text-2xl font-bold ${tone}`}>{value}</p>
    </div>
  );
}
