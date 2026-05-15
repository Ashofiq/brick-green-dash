import { Wallet } from "lucide-react";

export function ExpenseForm() {
  return (
    <div className="rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card">
      <div className="flex items-center gap-3 border-b-2 border-border-strong pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-border-strong bg-secondary text-primary">
          <Wallet className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold">দ্রুত খরচ এন্ট্রি</h3>
          <p className="text-sm text-muted-foreground">আজকের খরচ যোগ করুন</p>
        </div>
      </div>

      <form className="mt-5 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-semibold">খরচের ধরন</label>
          <select className="h-12 w-full rounded-xl border-2 border-border bg-background px-3 text-sm font-medium focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-ring/30">
            <option>জ্বালানি / কয়লা</option>
            <option>মাটি ক্রয়</option>
            <option>শ্রমিক মজুরি</option>
            <option>ট্রাক মেরামত</option>
            <option>অন্যান্য</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-sm font-semibold">পরিমাণ (৳)</label>
            <input
              type="text"
              placeholder="০"
              className="h-12 w-full rounded-xl border-2 border-border bg-background px-3 text-base font-bold focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold">তারিখ</label>
            <input
              type="date"
              className="h-12 w-full rounded-xl border-2 border-border bg-background px-3 text-sm font-medium focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold">নোট</label>
          <textarea
            rows={2}
            placeholder="বিস্তারিত লিখুন..."
            className="w-full rounded-xl border-2 border-border bg-background px-3 py-2 text-sm focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
        </div>

        <button
          type="button"
          className="h-12 w-full rounded-xl border-2 border-success bg-primary text-base font-bold text-primary-foreground shadow-card transition-all hover:bg-success active:translate-y-0.5"
        >
          ✓ খরচ সংরক্ষণ করুন
        </button>
      </form>
    </div>
  );
}
