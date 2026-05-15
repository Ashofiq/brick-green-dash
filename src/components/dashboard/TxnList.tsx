import { useState } from "react";
import { Pencil, Trash2, TrendingUp, TrendingDown, Search, X, Check } from "lucide-react";
import { useTxns, bn, type Txn } from "@/lib/txn-store";

type Props = {
  kind?: "income" | "expense";
  title?: string;
};

export function TxnList({ kind, title }: Props) {
  const { list, update, remove } = useTxns(kind);
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<Txn | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const filtered = list.filter(
    (t) =>
      t.party.toLowerCase().includes(q.toLowerCase()) ||
      t.categoryLabel.includes(q) ||
      (t.note ?? "").toLowerCase().includes(q.toLowerCase()),
  );

  const total = filtered.reduce((s, t) => s + t.amount, 0);

  return (
    <div className="rounded-2xl border-2 border-border-strong bg-card shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-border-strong p-4">
        <div>
          <h3 className="text-lg font-bold">{title ?? "এন্ট্রি তালিকা"}</h3>
          <p className="text-xs text-muted-foreground">
            মোট {bn(filtered.length)} টি · ৳ {bn(total)}
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="খুঁজুন..."
            className="h-10 w-56 rounded-xl border-2 border-border bg-background pl-9 pr-3 text-sm focus:border-border-strong focus:outline-none"
          />
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <tr className="border-b-2 border-border-strong">
              <th className="px-4 py-3">তারিখ</th>
              <th className="px-4 py-3">ধরন</th>
              <th className="px-4 py-3">কার সাথে</th>
              <th className="px-4 py-3">নোট</th>
              <th className="px-4 py-3 text-right">টাকা</th>
              <th className="px-4 py-3 text-right">কাজ</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => {
              const inc = t.kind === "income";
              return (
                <tr key={t.id} className="border-b border-border last:border-0 hover:bg-secondary/30">
                  <td className="px-4 py-3 font-medium whitespace-nowrap">{t.date}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border-2 px-2.5 py-0.5 text-xs font-bold ${
                        inc
                          ? "border-success/40 bg-success/10 text-success"
                          : "border-destructive/40 bg-destructive/10 text-destructive"
                      }`}
                    >
                      {inc ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {t.categoryLabel}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium">{t.party || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{t.note || "—"}</td>
                  <td className={`px-4 py-3 text-right font-bold whitespace-nowrap ${inc ? "text-success" : "text-destructive"}`}>
                    {inc ? "+" : "−"} ৳{bn(t.amount)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex gap-1.5">
                      <button
                        onClick={() => setEditing(t)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border-2 border-border bg-background text-primary hover:bg-secondary"
                        aria-label="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setConfirmId(t.id)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border-2 border-destructive/40 bg-background text-destructive hover:bg-destructive/10"
                        aria-label="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-sm text-muted-foreground">
                  কোন এন্ট্রি নেই
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <ul className="md:hidden divide-y-2 divide-border">
        {filtered.map((t) => {
          const inc = t.kind === "income";
          return (
            <li key={t.id} className="p-3 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-bold truncate">{t.party || t.categoryLabel}</p>
                  <p className="text-xs text-muted-foreground">{t.categoryLabel} · {t.date}</p>
                  {t.note && <p className="text-xs text-muted-foreground mt-0.5">{t.note}</p>}
                </div>
                <span className={`text-base font-bold whitespace-nowrap ${inc ? "text-success" : "text-destructive"}`}>
                  {inc ? "+" : "−"} ৳{bn(t.amount)}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditing(t)}
                  className="flex-1 h-10 rounded-lg border-2 border-border bg-background text-sm font-semibold text-primary inline-flex items-center justify-center gap-1.5"
                >
                  <Pencil className="h-4 w-4" /> এডিট
                </button>
                <button
                  onClick={() => setConfirmId(t.id)}
                  className="flex-1 h-10 rounded-lg border-2 border-destructive/40 bg-background text-sm font-semibold text-destructive inline-flex items-center justify-center gap-1.5"
                >
                  <Trash2 className="h-4 w-4" /> ডিলিট
                </button>
              </div>
            </li>
          );
        })}
        {filtered.length === 0 && (
          <li className="p-8 text-center text-sm text-muted-foreground">কোন এন্ট্রি নেই</li>
        )}
      </ul>

      {editing && (
        <EditModal
          txn={editing}
          onClose={() => setEditing(null)}
          onSave={(patch) => {
            update(editing.id, patch);
            setEditing(null);
          }}
        />
      )}

      {confirmId && (
        <ConfirmModal
          onCancel={() => setConfirmId(null)}
          onConfirm={() => {
            remove(confirmId);
            setConfirmId(null);
          }}
        />
      )}
    </div>
  );
}

function EditModal({
  txn,
  onClose,
  onSave,
}: {
  txn: Txn;
  onClose: () => void;
  onSave: (patch: Partial<Txn>) => void;
}) {
  const [amount, setAmount] = useState(String(txn.amount));
  const [party, setParty] = useState(txn.party);
  const [date, setDate] = useState(txn.date);
  const [note, setNote] = useState(txn.note ?? "");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl border-2 border-border-strong bg-card shadow-card">
        <div className="flex items-center justify-between border-b-2 border-border-strong p-4">
          <div>
            <h4 className="text-lg font-bold">এন্ট্রি এডিট করুন</h4>
            <p className="text-xs text-muted-foreground">{txn.categoryLabel}</p>
          </div>
          <button onClick={onClose} className="rounded-lg border-2 border-border p-2 hover:bg-secondary">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-4 space-y-3">
          <div>
            <label className="mb-1.5 block text-sm font-semibold">পরিমাণ (৳)</label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^\d]/g, ""))}
              inputMode="numeric"
              className="h-12 w-full rounded-xl border-2 border-border bg-background px-3 text-lg font-bold focus:border-border-strong focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-semibold">কার সাথে</label>
              <input
                value={party}
                onChange={(e) => setParty(e.target.value)}
                className="h-11 w-full rounded-xl border-2 border-border bg-background px-3 text-sm focus:border-border-strong focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold">তারিখ</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-11 w-full rounded-xl border-2 border-border bg-background px-3 text-sm focus:border-border-strong focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold">নোট</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              className="w-full rounded-xl border-2 border-border bg-background p-3 text-sm focus:border-border-strong focus:outline-none"
            />
          </div>
        </div>
        <div className="flex gap-2 border-t-2 border-border-strong p-4">
          <button
            onClick={onClose}
            className="flex-1 h-11 rounded-xl border-2 border-border bg-background text-sm font-bold hover:bg-secondary"
          >
            বাতিল
          </button>
          <button
            onClick={() => onSave({ amount: Number(amount) || 0, party, date, note })}
            className="flex-1 h-11 rounded-xl border-2 border-success bg-primary text-sm font-bold text-primary-foreground inline-flex items-center justify-center gap-1.5"
          >
            <Check className="h-4 w-4" /> সংরক্ষণ
          </button>
        </div>
      </div>
    </div>
  );
}

function ConfirmModal({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-destructive/40 bg-destructive/10 text-destructive">
          <Trash2 className="h-5 w-5" />
        </div>
        <h4 className="mt-4 text-lg font-bold">এন্ট্রি ডিলিট করবেন?</h4>
        <p className="mt-1 text-sm text-muted-foreground">
          এই কাজ ফিরিয়ে আনা যাবে না। আপনি কি নিশ্চিত?
        </p>
        <div className="mt-5 flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 h-11 rounded-xl border-2 border-border bg-background text-sm font-bold hover:bg-secondary"
          >
            না
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 h-11 rounded-xl border-2 border-destructive bg-destructive text-sm font-bold text-destructive-foreground"
          >
            হ্যাঁ, ডিলিট
          </button>
        </div>
      </div>
    </div>
  );
}
