import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BookOpenCheck, Printer, Search, FileSpreadsheet, ArrowUpRight, ArrowDownRight, Folder, FolderOpen, ArrowLeft, Users, Truck, Wallet, Landmark, UserCog, Crown } from "lucide-react";
import { AppLayout } from "@/components/dashboard/AppLayout";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { useTxns, bn } from "@/lib/txn-store";

export const Route = createFileRoute("/reports/ledger")({
  component: LedgerReportPage,
});

type Account = {
  id: string;
  name: string;
  type: string;
  opening: number;
  balType: "Receive" | "Payable";
};

const ACCOUNTS: Account[] = [
  { id: "1", name: "করিম ট্রেডার্স", type: "কাস্টমার", opening: 25000, balType: "Receive" },
  { id: "2", name: "হাসান বিল্ডার্স", type: "কাস্টমার", opening: 50000, balType: "Receive" },
  { id: "3", name: "রহমান কোল সাপ্লাই", type: "সাপ্লায়ার", opening: 18000, balType: "Payable" },
  { id: "4", name: "মাটি ডিপো — শফিক", type: "সাপ্লায়ার", opening: 7200, balType: "Payable" },
  { id: "5", name: "জসিম উদ্দিন", type: "কর্মচারী", opening: 0, balType: "Payable" },
  { id: "6", name: "সিটি ব্যাংক — ০১২৩", type: "ব্যাংক", opening: 240000, balType: "Receive" },
  { id: "7", name: "অফিস ক্যাশ", type: "ক্যাশ", opening: 32000, balType: "Receive" },
  { id: "8", name: "মালিক — ফারুক সাহেব", type: "মালিক", opening: 500000, balType: "Payable" },
  { id: "9", name: "কয়লা সাপ্লায়ার", type: "সাপ্লায়ার", opening: 0, balType: "Payable" },
  { id: "10", name: "দল ২", type: "কর্মচারী", opening: 0, balType: "Payable" },
  { id: "11", name: "রহিম মিয়া", type: "সাপ্লায়ার", opening: 0, balType: "Payable" },
  { id: "12", name: "ট্রাক চালক", type: "সাপ্লায়ার", opening: 0, balType: "Payable" },
];

function todayISO(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

const TYPE_META: Record<string, { icon: typeof Users; tone: string; bg: string }> = {
  "কাস্টমার": { icon: Users, tone: "text-blue-600", bg: "bg-blue-50" },
  "সাপ্লায়ার": { icon: Truck, tone: "text-orange-600", bg: "bg-orange-50" },
  "কর্মচারী": { icon: UserCog, tone: "text-purple-600", bg: "bg-purple-50" },
  "ব্যাংক": { icon: Landmark, tone: "text-emerald-600", bg: "bg-emerald-50" },
  "ক্যাশ": { icon: Wallet, tone: "text-amber-600", bg: "bg-amber-50" },
  "মালিক": { icon: Crown, tone: "text-rose-600", bg: "bg-rose-50" },
};

function LedgerReportPage() {
  const { list: allTxns } = useTxns();
  const [accountId, setAccountId] = useState<string | null>(null);
  const [fromDate, setFromDate] = useState<string>(todayISO(-30));
  const [toDate, setToDate] = useState<string>(todayISO(0));
  const [generated, setGenerated] = useState<{
    accountId: string;
    from: string;
    to: string;
  } | null>(null);

  const account = ACCOUNTS.find((a) => a.id === accountId);

  // group accounts by type for folder view
  const folders = useMemo(() => {
    const map = new Map<string, Account[]>();
    ACCOUNTS.forEach((a) => {
      if (!map.has(a.type)) map.set(a.type, []);
      map.get(a.type)!.push(a);
    });
    return Array.from(map.entries());
  }, []);

  const openLedger = (id: string) => {
    setAccountId(id);
    setGenerated({ accountId: id, from: fromDate, to: toDate });
  };

  const backToFolders = () => {
    setAccountId(null);
    setGenerated(null);
  };


  const report = useMemo(() => {
    if (!generated) return null;
    const acc = ACCOUNTS.find((a) => a.id === generated.accountId);
    if (!acc) return null;

    // Filter txns by account name match + date range
    const inRange = allTxns
      .filter((t) => t.party.trim() === acc.name.trim())
      .filter((t) => t.date >= generated.from && t.date <= generated.to)
      .sort((a, b) => (a.date < b.date ? -1 : 1));

    // Opening balance: positive = Receive (debit), negative = Payable (credit)
    const openingSigned = acc.balType === "Receive" ? acc.opening : -acc.opening;

    // For ledger: income from this party = receive (debit ↑), expense to party = payment (credit ↓)
    let running = openingSigned;
    const rows = inRange.map((t) => {
      const debit = t.kind === "income" ? t.amount : 0;
      const credit = t.kind === "expense" ? t.amount : 0;
      running += debit - credit;
      return { ...t, debit, credit, balance: running };
    });

    const totalDebit = rows.reduce((s, r) => s + r.debit, 0);
    const totalCredit = rows.reduce((s, r) => s + r.credit, 0);
    const closing = running;

    return { acc, rows, totalDebit, totalCredit, openingSigned, closing };
  }, [generated, allTxns]);

  // count txns per account for folder badges
  const txnCountByAcc = useMemo(() => {
    const m = new Map<string, number>();
    allTxns.forEach((t) => {
      const a = ACCOUNTS.find((x) => x.name.trim() === t.party.trim());
      if (a) m.set(a.id, (m.get(a.id) ?? 0) + 1);
    });
    return m;
  }, [allTxns]);

  return (
    <AppLayout>
      <PageHeader
        icon={BookOpenCheck}
        title="খতিয়ান রিপোর্ট"
        subtitle={account ? account.name : "ফোল্ডার থেকে অ্যাকাউন্ট বাছাই করুন"}
        actions={
          account ? (
            <div className="flex gap-2">
              <button
                onClick={backToFolders}
                className="h-11 inline-flex items-center gap-2 rounded-xl border-2 border-border-strong bg-card px-4 text-sm font-semibold hover:bg-secondary"
              >
                <ArrowLeft className="h-4 w-4" /> ফোল্ডার
              </button>
              <button
                onClick={() => window.print()}
                disabled={!report}
                className="h-11 inline-flex items-center gap-2 rounded-xl border-2 border-border-strong bg-card px-4 text-sm font-semibold hover:bg-secondary disabled:opacity-50"
              >
                <Printer className="h-4 w-4" /> প্রিন্ট
              </button>
            </div>
          ) : null
        }
      />

      {/* Folder view */}
      {!account && (
        <div className="space-y-6">
          {folders.map(([type, accs]) => {
            const meta = TYPE_META[type] ?? { icon: Folder, tone: "text-foreground", bg: "bg-secondary" };
            const Icon = meta.icon;
            return (
              <section key={type}>
                <div className="mb-3 flex items-center gap-2">
                  <Icon className={`h-5 w-5 ${meta.tone}`} />
                  <h3 className="text-base font-bold">{type}</h3>
                  <span className="text-xs text-muted-foreground">({accs.length})</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {accs.map((a) => {
                    const count = txnCountByAcc.get(a.id) ?? 0;
                    return (
                      <button
                        key={a.id}
                        onClick={() => openLedger(a.id)}
                        className="group relative text-left rounded-2xl border-2 border-border-strong bg-card p-4 shadow-card hover:border-primary hover:shadow-lg transition-all"
                      >
                        <div className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl ${meta.bg}`}>
                          <Folder className={`h-6 w-6 ${meta.tone} group-hover:hidden`} />
                          <FolderOpen className={`h-6 w-6 ${meta.tone} hidden group-hover:block`} />
                        </div>
                        <p className="font-bold leading-tight line-clamp-2">{a.name}</p>
                        <p className="mt-1 text-[11px] text-muted-foreground">{a.type}</p>
                        <div className="mt-3 flex items-end justify-between">
                          <div>
                            <p className="text-[10px] text-muted-foreground">প্রারম্ভিক</p>
                            <p className={`text-sm font-bold ${a.balType === "Receive" ? "text-success" : "text-destructive"}`}>
                              ৳ {bn(a.opening)}
                            </p>
                          </div>
                          <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                            {bn(count)} এন্ট্রি
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {/* Filter card (only when folder open) */}
      {account && (
      <section className="no-print rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-5">
            <label className="mb-1.5 block text-sm font-semibold">অ্যাকাউন্ট</label>
            <select
              value={accountId ?? ""}
              onChange={(e) => setAccountId(e.target.value)}
              className="h-12 w-full rounded-xl border-2 border-border bg-background px-3 text-sm font-medium focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-ring/30"
            >
              {ACCOUNTS.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} — {a.type}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-3">
            <label className="mb-1.5 block text-sm font-semibold">শুরু তারিখ</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="h-12 w-full rounded-xl border-2 border-border bg-background px-3 text-sm font-medium focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
          </div>
          <div className="md:col-span-3">
            <label className="mb-1.5 block text-sm font-semibold">শেষ তারিখ</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="h-12 w-full rounded-xl border-2 border-border bg-background px-3 text-sm font-medium focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
          </div>
          <div className="md:col-span-1 flex items-end">
            <button
              onClick={() => accountId && setGenerated({ accountId, from: fromDate, to: toDate })}
              className="h-12 w-full rounded-xl border-2 border-success bg-primary text-sm font-bold text-primary-foreground shadow-card inline-flex items-center justify-center gap-1.5"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Quick range */}
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            { l: "আজ", f: todayISO(0), t: todayISO(0) },
            { l: "৭ দিন", f: todayISO(-7), t: todayISO(0) },
            { l: "৩০ দিন", f: todayISO(-30), t: todayISO(0) },
            { l: "এই মাস", f: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0,10), t: todayISO(0) },
          ].map((q) => (
            <button
              key={q.l}
              onClick={() => { setFromDate(q.f); setToDate(q.t); }}
              className="h-9 rounded-lg border-2 border-border bg-background px-3 text-xs font-bold hover:bg-secondary"
            >
              {q.l}
            </button>
          ))}
        </div>
      </section>
      )}

      {/* Report */}
      {report && (
        <section id="ledger-print" className="rounded-2xl border-2 border-border-strong bg-card shadow-card">
          {/* Header */}
          <div className="border-b-2 border-border-strong p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">খতিয়ান হিসাব</p>
                <h2 className="mt-1 text-2xl font-bold">{report.acc.name}</h2>
                <p className="text-sm text-muted-foreground">{report.acc.type}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">সময়কাল</p>
                <p className="text-sm font-bold">{generated!.from} → {generated!.to}</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              <Stat label="প্রারম্ভিক" value={`৳ ${bn(Math.abs(report.openingSigned))}`} hint={report.openingSigned >= 0 ? "পাবো" : "দিবো"} tone={report.openingSigned >= 0 ? "text-success" : "text-destructive"} />
              <Stat label="মোট ডেবিট" value={`৳ ${bn(report.totalDebit)}`} hint="পাওয়া" tone="text-success" />
              <Stat label="মোট ক্রেডিট" value={`৳ ${bn(report.totalCredit)}`} hint="দেওয়া" tone="text-destructive" />
              <Stat label="সমাপনী ব্যালেন্স" value={`৳ ${bn(Math.abs(report.closing))}`} hint={report.closing >= 0 ? "পাবো" : "দিবো"} tone={report.closing >= 0 ? "text-success" : "text-destructive"} highlight />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/40 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <tr className="border-b-2 border-border-strong">
                  <th className="px-4 py-3">তারিখ</th>
                  <th className="px-4 py-3">বিবরণ</th>
                  <th className="px-4 py-3 text-right">ডেবিট (পাওয়া)</th>
                  <th className="px-4 py-3 text-right">ক্রেডিট (দেওয়া)</th>
                  <th className="px-4 py-3 text-right">ব্যালেন্স</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border bg-secondary/20">
                  <td className="px-4 py-3 font-bold">{generated!.from}</td>
                  <td className="px-4 py-3 font-bold italic text-muted-foreground">প্রারম্ভিক ব্যালেন্স</td>
                  <td className="px-4 py-3 text-right">{report.openingSigned > 0 ? `৳ ${bn(report.openingSigned)}` : "—"}</td>
                  <td className="px-4 py-3 text-right">{report.openingSigned < 0 ? `৳ ${bn(-report.openingSigned)}` : "—"}</td>
                  <td className={`px-4 py-3 text-right font-bold ${report.openingSigned >= 0 ? "text-success" : "text-destructive"}`}>
                    ৳ {bn(Math.abs(report.openingSigned))} {report.openingSigned >= 0 ? "Dr" : "Cr"}
                  </td>
                </tr>
                {report.rows.map((r) => (
                  <tr key={r.id} className="border-b border-border hover:bg-secondary/20">
                    <td className="px-4 py-3 font-medium whitespace-nowrap">{r.date}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {r.kind === "income" ? (
                          <ArrowDownRight className="h-4 w-4 text-success" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4 text-destructive" />
                        )}
                        <div>
                          <p className="font-semibold">{r.categoryLabel}</p>
                          {r.note && <p className="text-xs text-muted-foreground">{r.note}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-success">
                      {r.debit ? `৳ ${bn(r.debit)}` : "—"}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-destructive">
                      {r.credit ? `৳ ${bn(r.credit)}` : "—"}
                    </td>
                    <td className={`px-4 py-3 text-right font-bold whitespace-nowrap ${r.balance >= 0 ? "text-success" : "text-destructive"}`}>
                      ৳ {bn(Math.abs(r.balance))} {r.balance >= 0 ? "Dr" : "Cr"}
                    </td>
                  </tr>
                ))}
                {report.rows.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-sm text-muted-foreground">
                      <FileSpreadsheet className="mx-auto mb-2 h-8 w-8 opacity-50" />
                      এই সময়কালে কোন লেনদেন নেই
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot className="bg-secondary/40 font-bold">
                <tr className="border-t-2 border-border-strong">
                  <td className="px-4 py-3" colSpan={2}>মোট</td>
                  <td className="px-4 py-3 text-right text-success">৳ {bn(report.totalDebit)}</td>
                  <td className="px-4 py-3 text-right text-destructive">৳ {bn(report.totalCredit)}</td>
                  <td className={`px-4 py-3 text-right ${report.closing >= 0 ? "text-success" : "text-destructive"}`}>
                    ৳ {bn(Math.abs(report.closing))} {report.closing >= 0 ? "Dr" : "Cr"}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="border-t-2 border-border-strong p-4 text-xs text-muted-foreground flex flex-wrap justify-between gap-2">
            <span>Dr = পাবো (Receivable) · Cr = দিবো (Payable)</span>
            <span>রিপোর্ট তৈরি: {new Date().toLocaleString("bn-BD")}</span>
          </div>
        </section>
      )}

      {!report && account && (
        <div className="rounded-2xl border-2 border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
          ফিল্টার বাছাই করে রিপোর্ট তৈরি করুন
        </div>
      )}
    </AppLayout>
  );
}


function Stat({
  label,
  value,
  hint,
  tone,
  highlight,
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: string;
  highlight?: boolean;
}) {
  return (
    <div className={`rounded-xl border-2 p-3 ${highlight ? "border-border-strong bg-secondary" : "border-border bg-background"}`}>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`mt-0.5 text-lg font-bold ${tone ?? ""}`}>{value}</p>
      {hint && <p className="text-[11px] font-semibold text-muted-foreground">{hint}</p>}
    </div>
  );
}
