import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  BookOpen,
  TrendingUp,
  TrendingDown,
  Wallet,
  Truck,
  ShoppingCart,
  Users,
  Flame,
  Mountain,
  Wrench,
  Banknote,
  Receipt,
  Calendar,
  Check,
  Printer,
} from "lucide-react";
import { AppLayout } from "@/components/dashboard/AppLayout";
import { PageHeader } from "@/components/dashboard/PageHeader";

export const Route = createFileRoute("/accounts/")({
  component: AccountsPage,
});

type Kind = "income" | "expense";

const incomeCats = [
  { id: "sale", label: "ইট বিক্রয়", icon: ShoppingCart },
  { id: "advance", label: "অগ্রিম পেমেন্ট", icon: Banknote },
  { id: "delivery", label: "ডেলিভারি ফি", icon: Truck },
  { id: "other_in", label: "অন্যান্য আয়", icon: Receipt },
];

const expenseCats = [
  { id: "fuel", label: "জ্বালানি / কয়লা", icon: Flame },
  { id: "soil", label: "মাটি ক্রয়", icon: Mountain },
  { id: "wage", label: "শ্রমিক মজুরি", icon: Users },
  { id: "repair", label: "মেরামত / যন্ত্রাংশ", icon: Wrench },
  { id: "truck", label: "ট্রাক ভাড়া", icon: Truck },
  { id: "other_out", label: "অন্যান্য খরচ", icon: Wallet },
];

const recent = [
  { type: "income", label: "ইট বিক্রয় — করিম ট্রেডার্স", amount: 84500, date: "আজ, ২:১৫" },
  { type: "expense", label: "জ্বালানি — কয়লা ৩ টন", amount: 32000, date: "আজ, ১১:৪০" },
  { type: "expense", label: "শ্রমিক মজুরি — দল ২", amount: 18200, date: "আজ, ৯:১০" },
  { type: "income", label: "অগ্রিম — হাসান বিল্ডার্স", amount: 50000, date: "গতকাল" },
  { type: "expense", label: "মাটি ক্রয় — ১২ ট্রাক", amount: 24000, date: "গতকাল" },
] as const;

const bn = (n: number) =>
  n.toLocaleString("bn-BD", { maximumFractionDigits: 0 });

function AccountsPage() {
  const [kind, setKind] = useState<Kind>("expense");
  const [category, setCategory] = useState<string>("fuel");
  const [amount, setAmount] = useState<string>("");

  const cats = kind === "income" ? incomeCats : expenseCats;
  const isIncome = kind === "income";

  const setQuick = (n: number) =>
    setAmount(String((Number(amount.replace(/[^\d]/g, "")) || 0) + n));

  return (
    <AppLayout>
      <PageHeader
        icon={BookOpen}
        title="হিসাব এন্ট্রি"
        subtitle="আজকের আয় বা খরচ সহজভাবে যোগ করুন"
        actions={
          <button className="h-11 inline-flex items-center gap-2 rounded-xl border-2 border-border-strong bg-card px-4 text-sm font-semibold hover:bg-secondary">
            <Printer className="h-4 w-4" /> দিনের রিপোর্ট
          </button>
        }
      />

      {/* Today summary */}
      <section className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-border-strong bg-secondary text-success">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">আজকের আয়</p>
              <p className="text-2xl font-bold text-success">৳ ১,৩৪,৫০০</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-border-strong bg-secondary text-destructive">
              <TrendingDown className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">আজকের খরচ</p>
              <p className="text-2xl font-bold text-destructive">৳ ৭৪,২০০</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border-2 border-border-strong bg-primary p-5 shadow-card text-primary-foreground col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-primary-foreground/30 bg-primary-foreground/15">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm opacity-90">নিট মুনাফা</p>
              <p className="text-2xl font-bold">৳ ৬০,৩০০</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Big simple form */}
        <div className="lg:col-span-3 rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card">
          {/* Step 1: Income or Expense — giant toggle */}
          <p className="text-sm font-bold text-muted-foreground">ধাপ ১ — কী যোগ করবেন?</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => { setKind("income"); setCategory(incomeCats[0].id); }}
              className={`flex items-center justify-center gap-2 h-20 rounded-2xl border-2 text-lg font-bold transition-all ${
                isIncome
                  ? "border-success bg-success text-success-foreground shadow-card"
                  : "border-border bg-background text-muted-foreground hover:border-border-strong"
              }`}
            >
              <TrendingUp className="h-6 w-6" /> টাকা পেলাম
            </button>
            <button
              type="button"
              onClick={() => { setKind("expense"); setCategory(expenseCats[0].id); }}
              className={`flex items-center justify-center gap-2 h-20 rounded-2xl border-2 text-lg font-bold transition-all ${
                !isIncome
                  ? "border-destructive bg-destructive text-destructive-foreground shadow-card"
                  : "border-border bg-background text-muted-foreground hover:border-border-strong"
              }`}
            >
              <TrendingDown className="h-6 w-6" /> টাকা দিলাম
            </button>
          </div>

          {/* Step 2: Category as visual buttons */}
          <p className="mt-6 text-sm font-bold text-muted-foreground">ধাপ ২ — কিসের জন্য?</p>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {cats.map((c) => {
              const active = category === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id)}
                  className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all ${
                    active
                      ? "border-border-strong bg-secondary shadow-card"
                      : "border-border bg-background hover:border-border-strong"
                  }`}
                >
                  <span className={`flex h-12 w-12 items-center justify-center rounded-xl border-2 ${
                    active ? "border-border-strong bg-card text-primary" : "border-border bg-card text-muted-foreground"
                  }`}>
                    <c.icon className="h-6 w-6" />
                  </span>
                  <span className="text-sm font-semibold text-center">{c.label}</span>
                </button>
              );
            })}
          </div>

          {/* Step 3: Amount with big input + quick add */}
          <p className="mt-6 text-sm font-bold text-muted-foreground">ধাপ ৩ — কত টাকা?</p>
          <div className="mt-3 rounded-2xl border-2 border-border-strong bg-secondary/40 p-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-primary">৳</span>
              <input
                type="text"
                inputMode="numeric"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^\d]/g, ""))}
                placeholder="০"
                className="flex-1 h-16 rounded-xl border-2 border-border-strong bg-card px-4 text-3xl font-bold tracking-tight focus:outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {[100, 500, 1000, 5000].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setQuick(n)}
                  className="h-11 rounded-xl border-2 border-border bg-card text-sm font-bold hover:bg-secondary"
                >
                  +{bn(n)}
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Date + note */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-semibold flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> তারিখ
              </label>
              <input
                type="date"
                defaultValue={new Date().toISOString().slice(0, 10)}
                className="h-12 w-full rounded-xl border-2 border-border bg-background px-3 text-sm font-medium focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-ring/30"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold">কার সাথে / নোট</label>
              <input
                type="text"
                placeholder="যেমন: করিম ট্রেডার্স"
                className="h-12 w-full rounded-xl border-2 border-border bg-background px-3 text-sm focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-ring/30"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="button"
            className={`mt-6 h-14 w-full rounded-2xl border-2 text-base font-bold shadow-card transition-all active:translate-y-0.5 inline-flex items-center justify-center gap-2 ${
              isIncome
                ? "border-success bg-success text-success-foreground hover:opacity-90"
                : "border-destructive bg-destructive text-destructive-foreground hover:opacity-90"
            }`}
          >
            <Check className="h-5 w-5" />
            {isIncome ? "আয় সংরক্ষণ করুন" : "খরচ সংরক্ষণ করুন"}
          </button>
        </div>

        {/* Recent entries */}
        <div className="lg:col-span-2 rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card">
          <div className="flex items-center justify-between border-b-2 border-border-strong pb-3">
            <h3 className="text-lg font-bold">আজকের এন্ট্রি</h3>
            <span className="rounded-full border-2 border-border-strong bg-secondary px-3 py-0.5 text-xs font-bold">
              {recent.length} টি
            </span>
          </div>
          <ul className="mt-4 space-y-3">
            {recent.map((r, i) => {
              const inc = r.type === "income";
              return (
                <li
                  key={i}
                  className="flex items-center justify-between rounded-xl border-2 border-border bg-background p-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-border-strong ${
                      inc ? "bg-secondary text-success" : "bg-card text-destructive"
                    }`}>
                      {inc ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate">{r.label}</p>
                      <p className="text-xs text-muted-foreground">{r.date}</p>
                    </div>
                  </div>
                  <span className={`text-base font-bold whitespace-nowrap ${inc ? "text-success" : "text-destructive"}`}>
                    {inc ? "+" : "−"} ৳{bn(r.amount)}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </AppLayout>
  );
}
