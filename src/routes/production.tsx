import { createFileRoute } from "@tanstack/react-router";
import { Factory, Plus, Calendar, Layers, Flame, Boxes } from "lucide-react";
import { AppLayout } from "@/components/dashboard/AppLayout";
import { PageHeader } from "@/components/dashboard/PageHeader";

export const Route = createFileRoute("/production")({
  component: ProductionPage,
});

const BRICK_TYPES = ["১ নম্বর ইট", "২ নম্বর ইট", "পিকেট ইট", "কাঁচা ইট"] as const;

const rows = [
  { date: "১৫ মে", batch: "ব্যাচ #২৪", type: "১ নম্বর ইট", green: "৩২,০০০", fired: "২৮,৪০০", fuel: "১,২৪০ কেজি", status: "চালু" },
  { date: "১৪ মে", batch: "ব্যাচ #২৩", type: "২ নম্বর ইট", green: "৩০,৫০০", fired: "২৭,৮০০", fuel: "১,১৮০ কেজি", status: "সম্পন্ন" },
  { date: "১৩ মে", batch: "ব্যাচ #২২", type: "পিকেট ইট", green: "২৯,০০০", fired: "২৬,৪০০", fuel: "১,১২০ কেজি", status: "সম্পন্ন" },
  { date: "১২ মে", batch: "ব্যাচ #২১", type: "১ নম্বর ইট", green: "৩১,২০০", fired: "২৮,১০০", fuel: "১,২০০ কেজি", status: "সম্পন্ন" },
];

function ProductionPage() {
  return (
    <AppLayout>
      <PageHeader
        icon={Factory}
        title="ইট উৎপাদন"
        subtitle="দৈনিক উৎপাদন ব্যাচ যোগ ও পরিচালনা করুন"
        actions={
          <button className="h-11 inline-flex items-center gap-2 rounded-xl border-2 border-success bg-primary px-4 text-sm font-bold text-primary-foreground shadow-card hover:bg-success">
            <Plus className="h-4 w-4" /> নতুন ব্যাচ
          </button>
        }
      />

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card">
          <h3 className="text-lg font-bold border-b-2 border-border-strong pb-3">দ্রুত উৎপাদন এন্ট্রি</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Field label="তারিখ" icon={<Calendar className="h-4 w-4" />}>
              <input type="date" defaultValue={new Date().toISOString().slice(0,10)} className={inputCls} />
            </Field>
            <Field label="ব্যাচ নম্বর">
              <input type="text" placeholder="#২৫" className={inputCls} />
            </Field>
            <div className="col-span-2">
              <Field label="ইটের ধরন" icon={<Boxes className="h-4 w-4" />}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {BRICK_TYPES.map((t, i) => (
                    <label
                      key={t}
                      className="cursor-pointer rounded-xl border-2 border-border bg-background px-3 py-2.5 text-center text-sm font-bold hover:border-border-strong has-[:checked]:border-success has-[:checked]:bg-secondary"
                    >
                      <input type="radio" name="btype" defaultChecked={i === 0} className="sr-only" />
                      {t}
                    </label>
                  ))}
                </div>
              </Field>
            </div>
            <Field label="কাঁচা ইট (পিস)" icon={<Layers className="h-4 w-4" />}>
              <input type="text" inputMode="numeric" placeholder="৩০,০০০" className={inputCls} />
            </Field>
            <Field label="পোড়ানো ইট (পিস)">
              <input type="text" inputMode="numeric" placeholder="২৮,০০০" className={inputCls} />
            </Field>
            <Field label="জ্বালানি (কেজি)" icon={<Flame className="h-4 w-4" />}>
              <input type="text" inputMode="numeric" placeholder="১,২০০" className={inputCls} />
            </Field>
            <Field label="অবস্থা">
              <select className={inputCls}>
                <option>চালু</option>
                <option>সম্পন্ন</option>
                <option>স্থগিত</option>
              </select>
            </Field>
          </div>
          <button className="mt-5 h-12 w-full rounded-xl border-2 border-success bg-primary text-primary-foreground font-bold hover:bg-success">
            ✓ সংরক্ষণ করুন
          </button>
        </div>

        <div className="rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card">
          <h3 className="text-lg font-bold border-b-2 border-border-strong pb-3">ইটের ধরন অনুযায়ী এই সপ্তাহ</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              { l: "১ নম্বর ইট", v: "৬৩,২০০", sub: "পোড়ানো" },
              { l: "২ নম্বর ইট", v: "৪১,৫০০", sub: "পোড়ানো" },
              { l: "পিকেট ইট", v: "২৬,৪০০", sub: "পোড়ানো" },
              { l: "কাঁচা ইট", v: "২২,০০০", sub: "মজুদ" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border-2 border-border bg-background p-4">
                <p className="text-xs text-muted-foreground">{s.l}</p>
                <p className="mt-1 text-xl font-bold">{s.v}</p>
                <p className="text-[11px] font-semibold text-success">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DataTable
        title="সাম্প্রতিক ব্যাচ"
        columns={["তারিখ", "ব্যাচ", "ইটের ধরন", "কাঁচা ইট", "পোড়ানো", "জ্বালানি", "অবস্থা"]}
        rows={rows.map((r) => [
          r.date,
          r.batch,
          <span key={r.batch + "t"} className="inline-flex rounded-full border-2 border-border-strong bg-secondary px-2.5 py-0.5 text-xs font-bold">{r.type}</span>,
          r.green,
          r.fired,
          r.fuel,
          <Badge key={r.batch} tone={r.status === "চালু" ? "warning" : "success"}>{r.status}</Badge>,
        ])}
      />
    </AppLayout>
  );
}

const inputCls = "h-12 w-full rounded-xl border-2 border-border bg-background px-3 text-sm font-medium focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-ring/30";

function Field({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold">{icon}{label}</label>
      {children}
    </div>
  );
}

export function Badge({ tone, children }: { tone: "success" | "warning" | "danger"; children: React.ReactNode }) {
  const map = {
    success: "border-border-strong bg-secondary text-success",
    warning: "border-warning/40 bg-warning/15 text-warning-foreground",
    danger: "border-destructive/40 bg-destructive/10 text-destructive",
  };
  return <span className={`inline-flex rounded-full border-2 px-2.5 py-0.5 text-xs font-bold ${map[tone]}`}>{children}</span>;
}

export function DataTable({ title, columns, rows }: { title: string; columns: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="rounded-2xl border-2 border-border-strong bg-card shadow-card overflow-hidden">
      <div className="flex items-center justify-between border-b-2 border-border-strong p-5">
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40">
            <tr>
              {columns.map((c) => (
                <th key={c} className="px-4 py-3 text-left font-bold border-b-2 border-border-strong">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                {r.map((cell, j) => (
                  <td key={j} className="px-4 py-3 font-medium">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
