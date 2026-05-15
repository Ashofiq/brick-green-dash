import { useState, type ReactNode } from "react";
import { Calendar, Check, User } from "lucide-react";

type QuickCat = { id: string; label: string; icon: React.ComponentType<{ className?: string }> };

type Props = {
  tone: "income" | "expense";
  saveLabel: string;
  partyLabel: string;
  partyPlaceholder: string;
  categories: QuickCat[];
  defaultCategory?: string;
  extra?: ReactNode;
};

const bn = (n: number) => n.toLocaleString("bn-BD");

export function MoneyEntryForm({
  tone,
  saveLabel,
  partyLabel,
  partyPlaceholder,
  categories,
  defaultCategory,
  extra,
}: Props) {
  const [category, setCategory] = useState(defaultCategory ?? categories[0]?.id);
  const [amount, setAmount] = useState("");
  const isIncome = tone === "income";
  const setQuick = (n: number) =>
    setAmount(String((Number(amount.replace(/[^\d]/g, "")) || 0) + n));

  return (
    <div className="rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card space-y-6">
      <div>
        <p className="text-sm font-bold text-muted-foreground">ধাপ ১ — কিসের জন্য?</p>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {categories.map((c) => {
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
      </div>

      <div>
        <p className="text-sm font-bold text-muted-foreground">ধাপ ২ — কত টাকা?</p>
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
      </div>

      <div>
        <p className="text-sm font-bold text-muted-foreground">ধাপ ৩ — বিস্তারিত</p>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold">
              <User className="h-4 w-4" /> {partyLabel}
            </label>
            <input
              type="text"
              placeholder={partyPlaceholder}
              className="h-12 w-full rounded-xl border-2 border-border bg-background px-3 text-sm focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
          </div>
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold">
              <Calendar className="h-4 w-4" /> তারিখ
            </label>
            <input
              type="date"
              defaultValue={new Date().toISOString().slice(0, 10)}
              className="h-12 w-full rounded-xl border-2 border-border bg-background px-3 text-sm font-medium focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
          </div>
        </div>
        {extra}
        <div className="mt-3">
          <label className="mb-1.5 block text-sm font-semibold">নোট (ঐচ্ছিক)</label>
          <textarea
            rows={2}
            placeholder="অতিরিক্ত মন্তব্য..."
            className="w-full rounded-xl border-2 border-border bg-background p-3 text-sm focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
        </div>
      </div>

      <button
        type="button"
        className={`h-14 w-full rounded-2xl border-2 text-base font-bold shadow-card transition-all active:translate-y-0.5 inline-flex items-center justify-center gap-2 ${
          isIncome
            ? "border-success bg-success text-success-foreground hover:opacity-90"
            : "border-destructive bg-destructive text-destructive-foreground hover:opacity-90"
        }`}
      >
        <Check className="h-5 w-5" />
        {saveLabel}
      </button>
    </div>
  );
}
