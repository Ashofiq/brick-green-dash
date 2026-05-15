import { createFileRoute } from "@tanstack/react-router";
import { BadgeDollarSign, Printer } from "lucide-react";
import { AppLayout } from "@/components/dashboard/AppLayout";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Badge } from "./production";

export const Route = createFileRoute("/salary")({
  component: SalaryPage,
});

const list = [
  { name: "করিম মিয়া", role: "পাথান", days: 22, rate: 600, total: 13200, status: "বাকি" },
  { name: "রফিক হোসেন", role: "মাটি কাটা", days: 20, rate: 550, total: 11000, status: "বাকি" },
  { name: "জসিম উদ্দিন", role: "ট্রাক চালক", days: 24, rate: 800, total: 19200, status: "পরিশোধিত" },
  { name: "নুরুল ইসলাম", role: "পাথান", days: 21, rate: 600, total: 12600, status: "বাকি" },
];
const bn = (n: number) => n.toLocaleString("bn-BD");

function SalaryPage() {
  const total = list.reduce((s, w) => s + w.total, 0);
  return (
    <AppLayout>
      <PageHeader icon={BadgeDollarSign} title="বেতন" subtitle="মাসিক বেতন হিসাব ও বিতরণ" />

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { l: "মোট শ্রমিক", v: "৪৮" },
          { l: "এই মাসের বেতন", v: `৳ ${bn(total)}` },
          { l: "পরিশোধিত", v: "৳ ১৯,২০০" },
          { l: "বাকি", v: `৳ ${bn(total - 19200)}` },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card">
            <p className="text-sm text-muted-foreground">{s.l}</p>
            <p className="mt-1 text-2xl font-bold">{s.v}</p>
          </div>
        ))}
      </section>

      <div className="rounded-2xl border-2 border-border-strong bg-card shadow-card overflow-hidden">
        <div className="flex items-center justify-between border-b-2 border-border-strong p-5">
          <h3 className="text-lg font-bold">বেতন তালিকা</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/40">
              <tr>
                {["নাম", "কাজ", "দিন", "রেট", "মোট", "অবস্থা", ""].map((c) => (
                  <th key={c} className="px-4 py-3 text-left font-bold border-b-2 border-border-strong">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map((w) => (
                <tr key={w.name} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-bold">{w.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{w.role}</td>
                  <td className="px-4 py-3">{bn(w.days)}</td>
                  <td className="px-4 py-3">৳ {bn(w.rate)}</td>
                  <td className="px-4 py-3 font-bold text-success">৳ {bn(w.total)}</td>
                  <td className="px-4 py-3"><Badge tone={w.status === "পরিশোধিত" ? "success" : "warning"}>{w.status}</Badge></td>
                  <td className="px-4 py-3">
                    <button className="h-9 px-3 rounded-lg border-2 border-border-strong bg-secondary text-xs font-bold inline-flex items-center gap-1.5 hover:bg-card">
                      <Printer className="h-3.5 w-3.5" /> স্লিপ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
