import { createFileRoute } from "@tanstack/react-router";
import { Wallet } from "lucide-react";
import { AppLayout } from "@/components/dashboard/AppLayout";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { ExpenseForm } from "@/components/dashboard/ExpenseForm";
import { DataTable, Badge } from "./production";

export const Route = createFileRoute("/expenses")({
  component: ExpensesPage,
});

function ExpensesPage() {
  const rows = [
    ["১৫ মে", "জ্বালানি / কয়লা", "৳ ৩২,০০০", "কয়লা ৩ টন", <Badge key="1" tone="success">পরিশোধিত</Badge>],
    ["১৫ মে", "শ্রমিক মজুরি", "৳ ১৮,২০০", "দল ২", <Badge key="2" tone="success">পরিশোধিত</Badge>],
    ["১৪ মে", "ট্রাক মেরামত", "৳ ৫,৫০০", "চাকা পরিবর্তন", <Badge key="3" tone="warning">বাকি</Badge>],
    ["১৪ মে", "মাটি ক্রয়", "৳ ২৪,০০০", "১২ ট্রাক", <Badge key="4" tone="success">পরিশোধিত</Badge>],
  ];

  return (
    <AppLayout>
      <PageHeader icon={Wallet} title="দৈনিক খরচ" subtitle="সব খরচের তালিকা ও দ্রুত এন্ট্রি" />

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1"><ExpenseForm /></div>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[
              { l: "আজকের খরচ", v: "৳ ৭৪,২০০" },
              { l: "এই সপ্তাহের", v: "৳ ৪.৮ লক্ষ" },
              { l: "এই মাসের", v: "৳ ১৮.২ লক্ষ" },
              { l: "বাকি পরিশোধ", v: "৳ ৬২,৫০০" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card">
                <p className="text-sm text-muted-foreground">{s.l}</p>
                <p className="mt-1 text-2xl font-bold">{s.v}</p>
              </div>
            ))}
          </div>
          <DataTable title="সাম্প্রতিক খরচ" columns={["তারিখ", "ধরন", "টাকা", "নোট", "অবস্থা"]} rows={rows} />
        </div>
      </section>
    </AppLayout>
  );
}
