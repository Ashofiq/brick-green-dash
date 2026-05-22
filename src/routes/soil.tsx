import { createFileRoute } from "@tanstack/react-router";
import { Mountain, Plus, Trash2, Pencil, X, Check, ArrowDownToLine, ArrowUpFromLine, Boxes } from "lucide-react";
import { useMemo, useState } from "react";
import { AppLayout } from "@/components/dashboard/AppLayout";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { DataTable, Badge } from "./production";
import { useSoil, statusFor, soilStock, type SoilEntry, type SoilKind } from "@/lib/soil-store";

export const Route = createFileRoute("/soil")({
  component: SoilPage,
});

const inputCls =
  "h-11 w-full rounded-xl border-2 border-border bg-background px-3 text-sm font-medium focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-ring/30";

function toBn(n: number | string) {
  const map: Record<string, string> = { "0":"০","1":"১","2":"২","3":"৩","4":"৪","5":"৫","6":"৬","7":"৭","8":"৮","9":"৯" };
  return String(n).replace(/\d/g, (d) => map[d]);
}

function fmtDateBn(iso: string) {
  if (!iso) return "";
  const [, m, d] = iso.split("-");
  const months = ["জানু","ফেব","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগ","সেপ্ট","অক্টো","নভে","ডিসে"];
  return `${toBn(parseInt(d, 10))} ${months[parseInt(m, 10) - 1] ?? ""}`;
}

const TRUCK_PRICE_DEFAULT = 2000;

function SoilPage() {
  const { items, add, update, remove } = useSoil();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [kind, setKind] = useState<SoilKind>("সংগ্রহ");

  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    source: "",
    trucks: "",
    pricePerTruck: String(TRUCK_PRICE_DEFAULT),
    paid: "",
    note: "",
  });

  const isUse = kind === "ব্যবহার";
  const total = isUse ? 0 : (Number(form.trucks) || 0) * (Number(form.pricePerTruck) || 0);
  const paid = isUse ? 0 : Number(form.paid) || 0;
  const due = Math.max(0, total - paid);

  const resetForm = () => {
    setEditingId(null);
    setKind("সংগ্রহ");
    setForm({
      date: new Date().toISOString().slice(0, 10),
      source: "",
      trucks: "",
      pricePerTruck: String(TRUCK_PRICE_DEFAULT),
      paid: "",
      note: "",
    });
  };

  const stock = useMemo(() => soilStock(items), [items]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.source.trim() || !form.trucks) return;
    const trucks = Number(form.trucks);
    if (isUse && !editingId && trucks > stock.stock) {
      if (!confirm(`স্টকে আছে মাত্র ${toBn(stock.stock)} ট্রাক। তবুও বাদ দেবেন?`)) return;
    }
    const payload: Omit<SoilEntry, "id"> = {
      date: form.date,
      kind,
      source: form.source.trim(),
      trucks,
      pricePerTruck: isUse ? 0 : Number(form.pricePerTruck) || 0,
      total,
      paid,
      due,
      status: isUse ? "ব্যবহৃত" : statusFor(total, paid),
      note: form.note.trim() || undefined,
    };
    if (editingId) update(editingId, payload);
    else add(payload);
    resetForm();
  };

  const onEdit = (it: SoilEntry) => {
    setEditingId(it.id);
    setKind(it.kind);
    setForm({
      date: it.date,
      source: it.source,
      trucks: String(it.trucks),
      pricePerTruck: String(it.pricePerTruck),
      paid: String(it.paid),
      note: it.note ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDelete = (id: string) => {
    if (confirm("এই এন্ট্রিটি মুছে ফেলবেন?")) remove(id);
  };

  const stats = useMemo(() => {
    const inItems = items.filter((x) => x.kind === "সংগ্রহ");
    const thisMonth = inItems
      .filter((x) => x.date.slice(0, 7) === new Date().toISOString().slice(0, 7))
      .reduce((s, x) => s + x.trucks, 0);
    const totalDue = inItems.reduce((s, x) => s + x.due, 0);
    const totalSpend = inItems.reduce((s, x) => s + x.total, 0);
    return { thisMonth, totalDue, totalSpend };
  }, [items]);

  return (
    <AppLayout>
      <PageHeader
        icon={Mountain}
        title="মাটি ব্যবস্থাপনা"
        subtitle="মাটি সংগ্রহ, ব্যবহার ও স্টক ব্যবস্থাপনা"
        actions={
          <button
            type="button"
            onClick={resetForm}
            className="h-11 inline-flex items-center gap-2 rounded-xl border-2 border-border-strong bg-card px-4 text-sm font-bold hover:bg-secondary"
          >
            <Plus className="h-4 w-4" /> নতুন এন্ট্রি
          </button>
        }
      />

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border-2 border-border-strong bg-primary text-primary-foreground p-5 shadow-card">
          <div className="flex items-center gap-2 text-sm opacity-90"><Boxes className="h-4 w-4"/> বর্তমান স্টক</div>
          <p className="mt-1 text-3xl font-bold">{toBn(stock.stock)} <span className="text-base font-medium opacity-80">ট্রাক</span></p>
          <p className="mt-1 text-xs opacity-80">সংগ্রহ {toBn(stock.inTrucks)} − ব্যবহার {toBn(stock.outTrucks)}</p>
        </div>
        {[
          { l: "এই মাসের সংগ্রহ", v: `${toBn(stats.thisMonth)} ট্রাক` },
          { l: "মোট খরচ", v: `৳ ${toBn(stats.totalSpend.toLocaleString("en-US"))}` },
          { l: "বাকি পরিশোধ", v: `৳ ${toBn(stats.totalDue.toLocaleString("en-US"))}` },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card">
            <p className="text-sm text-muted-foreground">{s.l}</p>
            <p className="mt-1 text-2xl font-bold">{s.v}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <form
          onSubmit={onSubmit}
          className="lg:col-span-1 rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card space-y-3"
        >
          <div className="flex items-center justify-between border-b-2 border-border-strong pb-3">
            <h3 className="text-lg font-bold">{editingId ? "এন্ট্রি পরিবর্তন" : "নতুন এন্ট্রি"}</h3>
            {editingId && (
              <button type="button" onClick={resetForm} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setKind("সংগ্রহ")}
              className={`h-12 rounded-xl border-2 font-bold inline-flex items-center justify-center gap-2 ${kind === "সংগ্রহ" ? "border-success bg-success/10 text-success" : "border-border bg-background"}`}
            >
              <ArrowDownToLine className="h-4 w-4"/> সংগ্রহ (+)
            </button>
            <button
              type="button"
              onClick={() => setKind("ব্যবহার")}
              className={`h-12 rounded-xl border-2 font-bold inline-flex items-center justify-center gap-2 ${kind === "ব্যবহার" ? "border-destructive bg-destructive/10 text-destructive" : "border-border bg-background"}`}
            >
              <ArrowUpFromLine className="h-4 w-4"/> ব্যবহার (−)
            </button>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold">তারিখ</label>
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inputCls} />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold">{isUse ? "উদ্দেশ্য / ব্যাচ" : "উৎস / সরবরাহকারী"}</label>
            <input
              type="text"
              placeholder={isUse ? "যেমন: উৎপাদন ব্যাচ #১৫" : "যেমন: কাশেম মিয়া"}
              value={form.source}
              onChange={(e) => setForm({ ...form, source: e.target.value })}
              className={inputCls}
            />
          </div>

          <div className={`grid gap-3 ${isUse ? "grid-cols-1" : "grid-cols-2"}`}>
            <div>
              <label className="mb-1.5 block text-sm font-semibold">ট্রাক সংখ্যা</label>
              <input
                type="number"
                inputMode="numeric"
                min={0}
                placeholder="১০"
                value={form.trucks}
                onChange={(e) => setForm({ ...form, trucks: e.target.value })}
                className={inputCls}
              />
              {isUse && (
                <p className="mt-1 text-xs text-muted-foreground">স্টকে আছে: <span className="font-bold text-foreground">{toBn(stock.stock)} ট্রাক</span></p>
              )}
            </div>
            {!isUse && (
              <div>
                <label className="mb-1.5 block text-sm font-semibold">প্রতি ট্রাক (৳)</label>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={form.pricePerTruck}
                  onChange={(e) => setForm({ ...form, pricePerTruck: e.target.value })}
                  className={inputCls}
                />
              </div>
            )}
          </div>

          {!isUse && (
            <>
              <div className="rounded-xl border-2 border-border bg-background p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">মোট মূল্য</span>
                  <span className="text-lg font-bold">৳ {toBn(total.toLocaleString("en-US"))}</span>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold">পরিশোধিত (৳)</label>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  placeholder="০"
                  value={form.paid}
                  onChange={(e) => setForm({ ...form, paid: e.target.value })}
                  className={inputCls}
                />
                <div className="mt-1 flex gap-2">
                  <button type="button" onClick={() => setForm({ ...form, paid: String(total) })} className="rounded-lg border-2 border-border px-2 py-1 text-xs font-semibold hover:bg-secondary">পুরো</button>
                  <button type="button" onClick={() => setForm({ ...form, paid: String(Math.round(total / 2)) })} className="rounded-lg border-2 border-border px-2 py-1 text-xs font-semibold hover:bg-secondary">অর্ধেক</button>
                  <button type="button" onClick={() => setForm({ ...form, paid: "0" })} className="rounded-lg border-2 border-border px-2 py-1 text-xs font-semibold hover:bg-secondary">বাকি রাখুন</button>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">বাকি: ৳ {toBn(due.toLocaleString("en-US"))}</p>
              </div>
            </>
          )}

          <div>
            <label className="mb-1.5 block text-sm font-semibold">নোট (ঐচ্ছিক)</label>
            <textarea
              rows={2}
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              className="w-full rounded-xl border-2 border-border bg-background p-3 text-sm font-medium focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
          </div>

          <button
            type="submit"
            className="h-12 w-full inline-flex items-center justify-center gap-2 rounded-xl border-2 border-success bg-primary text-primary-foreground font-bold hover:bg-success"
          >
            <Check className="h-4 w-4" /> {editingId ? "আপডেট করুন" : "সংরক্ষণ করুন"}
          </button>
        </form>

        <div className="lg:col-span-2">
          <DataTable
            title={`মাটি লেনদেন তালিকা (${toBn(items.length)})`}
            columns={["তারিখ", "ধরন", "বিবরণ", "ট্রাক", "মূল্য", "বাকি", "অবস্থা", "অ্যাকশন"]}
            rows={
              items.length === 0
                ? [[<span key="e" className="text-muted-foreground text-sm">কোনো এন্ট্রি নেই — বাঁ দিকে ফর্ম থেকে যোগ করুন।</span>, "", "", "", "", "", "", ""]]
                : items.map((it) => [
                    fmtDateBn(it.date),
                    <Badge key={it.id + "k"} tone={it.kind === "সংগ্রহ" ? "success" : "danger"}>
                      {it.kind === "সংগ্রহ" ? "+ সংগ্রহ" : "− ব্যবহার"}
                    </Badge>,
                    <div key={it.id + "s"}>
                      <div className="font-semibold">{it.source}</div>
                      {it.note && <div className="text-xs text-muted-foreground">{it.note}</div>}
                    </div>,
                    `${toBn(it.trucks)} ট্রাক`,
                    it.kind === "ব্যবহার" ? "—" : `৳ ${toBn(it.total.toLocaleString("en-US"))}`,
                    it.kind === "ব্যবহার" ? "—" : `৳ ${toBn(it.due.toLocaleString("en-US"))}`,
                    <Badge key={it.id + "b"} tone={it.status === "পরিশোধিত" ? "success" : it.status === "আংশিক" ? "warning" : it.status === "ব্যবহৃত" ? "success" : "danger"}>
                      {it.status}
                    </Badge>,
                    <div key={it.id + "a"} className="flex gap-1">
                      <button
                        onClick={() => onEdit(it)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border-2 border-border hover:bg-secondary"
                        title="পরিবর্তন"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => onDelete(it.id)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border-2 border-destructive/40 text-destructive hover:bg-destructive/10"
                        title="মুছুন"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>,
                  ])
            }
          />
        </div>
      </section>
    </AppLayout>
  );
}
