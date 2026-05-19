import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ShoppingBag,
  User,
  Phone,
  Layers,
  Wallet,
  Banknote,
  Check,
  Trash2,
  Printer,
  Plus,
  Minus,
  CreditCard,
  StickyNote,
  Calendar,
} from "lucide-react";
import { AppLayout } from "@/components/dashboard/AppLayout";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { useSales, type Sale } from "@/lib/sales-store";
import { bnNum, bnMoney, toBn } from "@/lib/orders-data";
import { toast } from "sonner";

export const Route = createFileRoute("/sales")({
  component: SalesPage,
});

const brickTypes = [
  { name: "১ নম্বর ইট", price: 8.5, color: "bg-[oklch(0.62_0.18_30)]" },
  { name: "২ নম্বর ইট", price: 7, color: "bg-[oklch(0.65_0.14_50)]" },
  { name: "পিকেট ইট", price: 10, color: "bg-[oklch(0.55_0.20_25)]" },
  { name: "কাঁচা ইট", price: 5, color: "bg-[oklch(0.70_0.10_70)]" },
];

const payModes: Sale["paymentMode"][] = ["নগদ", "বাকি", "চেক", "বিকাশ"];

const bigInput =
  "h-14 w-full rounded-2xl border-2 border-border-strong bg-background px-4 text-lg font-semibold focus:border-success focus:outline-none focus:ring-4 focus:ring-success/20";

function SalesPage() {
  const { sales, add, remove } = useSales();
  const [brick, setBrick] = useState(brickTypes[0]);
  const [qty, setQty] = useState(1000);
  const [price, setPrice] = useState(brickTypes[0].price);
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [paid, setPaid] = useState(0);
  const [mode, setMode] = useState<Sale["paymentMode"]>("নগদ");
  const [note, setNote] = useState("");

  const total = useMemo(() => Math.round(qty * price), [qty, price]);
  const due = Math.max(0, total - paid);

  const today = new Date().toLocaleDateString("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const pickBrick = (b: (typeof brickTypes)[number]) => {
    setBrick(b);
    setPrice(b.price);
  };

  const reset = () => {
    setCustomer("");
    setPhone("");
    setQty(1000);
    setPaid(0);
    setNote("");
    setBrick(brickTypes[0]);
    setPrice(brickTypes[0].price);
    setMode("নগদ");
  };

  const save = () => {
    if (!customer.trim()) {
      toast.error("কাস্টমারের নাম লিখুন");
      return;
    }
    if (qty <= 0) {
      toast.error("পরিমাণ ০ এর বেশি দিন");
      return;
    }
    add({
      date: new Date().toISOString(),
      customer: customer.trim(),
      phone: phone.trim(),
      brickType: brick.name,
      qty,
      unitPrice: price,
      total,
      paid,
      due,
      paymentMode: mode,
      note: note.trim(),
    });
    toast.success("✅ বিক্রি সংরক্ষণ হয়েছে");
    reset();
  };

  return (
    <AppLayout>
      <PageHeader
        icon={ShoppingBag}
        title="ইট বিক্রি"
        subtitle={`আজ — ${today}`}
        actions={
          <button
            onClick={() => window.print()}
            className="h-11 px-4 rounded-xl border-2 border-border-strong bg-card font-semibold inline-flex items-center gap-2 hover:bg-secondary print:hidden"
          >
            <Printer className="h-4 w-4" /> প্রিন্ট
          </button>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Form column */}
        <div className="xl:col-span-2 space-y-4">
          {/* Step 1: Customer */}
          <Step n="১" title="কাকে বিক্রি করছেন?">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <BigField label="কাস্টমারের নাম" icon={<User className="h-5 w-5" />}>
                <input
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  placeholder="যেমন: করিম ভাই"
                  className={bigInput}
                  autoFocus
                />
              </BigField>
              <BigField label="মোবাইল (ঐচ্ছিক)" icon={<Phone className="h-5 w-5" />}>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  inputMode="tel"
                  placeholder="০১৭xxxxxxxx"
                  className={bigInput}
                />
              </BigField>
            </div>
          </Step>

          {/* Step 2: Brick */}
          <Step n="২" title="কোন ইট?">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {brickTypes.map((b) => {
                const active = b.name === brick.name;
                return (
                  <button
                    key={b.name}
                    type="button"
                    onClick={() => pickBrick(b)}
                    className={`relative rounded-2xl border-2 p-4 text-left transition-all ${
                      active
                        ? "border-success bg-secondary shadow-card scale-[1.02]"
                        : "border-border-strong bg-card hover:bg-secondary/50"
                    }`}
                  >
                    <div className={`h-10 w-10 rounded-xl ${b.color} border-2 border-border-strong`} />
                    <p className="mt-3 text-base font-bold">{b.name}</p>
                    <p className="text-sm text-muted-foreground">৳{toBn(b.price)}/পিস</p>
                    {active && (
                      <span className="absolute top-2 right-2 h-6 w-6 rounded-full bg-success text-white inline-flex items-center justify-center">
                        <Check className="h-4 w-4" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </Step>

          {/* Step 3: Qty & Price */}
          <Step n="৩" title="কতগুলো ইট?">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <BigField label="পরিমাণ (পিস)" icon={<Layers className="h-5 w-5" />}>
                <div className="flex items-stretch gap-2">
                  <button
                    type="button"
                    onClick={() => setQty(Math.max(0, qty - 100))}
                    className="h-14 w-14 rounded-2xl border-2 border-border-strong bg-card flex items-center justify-center hover:bg-secondary active:translate-y-0.5"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <input
                    type="number"
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value) || 0)}
                    className={`${bigInput} text-center text-2xl`}
                  />
                  <button
                    type="button"
                    onClick={() => setQty(qty + 100)}
                    className="h-14 w-14 rounded-2xl border-2 border-border-strong bg-card flex items-center justify-center hover:bg-secondary active:translate-y-0.5"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[500, 1000, 5000, 10000].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setQty(n)}
                      className="h-10 px-4 rounded-xl border-2 border-border-strong bg-background text-sm font-bold hover:bg-secondary"
                    >
                      {bnNum(n)}
                    </button>
                  ))}
                </div>
              </BigField>

              <BigField label="প্রতি পিস দাম (৳)" icon={<Banknote className="h-5 w-5" />}>
                <input
                  type="number"
                  step="0.5"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value) || 0)}
                  className={`${bigInput} text-2xl`}
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  সাজেস্ট: ৳{toBn(brick.price)}/পিস
                </p>
              </BigField>
            </div>
          </Step>

          {/* Step 4: Payment */}
          <Step n="৪" title="টাকা পেলেন কত?">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              {payModes.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`h-12 rounded-xl border-2 font-bold text-sm ${
                    mode === m
                      ? "border-success bg-secondary"
                      : "border-border-strong bg-card hover:bg-secondary/50"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <BigField label="টাকা গ্রহণ (৳)" icon={<Wallet className="h-5 w-5" />}>
              <input
                type="number"
                value={paid}
                onChange={(e) => setPaid(Number(e.target.value) || 0)}
                className={`${bigInput} text-2xl`}
              />
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setPaid(total)}
                  className="h-10 px-4 rounded-xl border-2 border-success bg-secondary text-sm font-bold"
                >
                  পুরো টাকা
                </button>
                <button
                  type="button"
                  onClick={() => setPaid(Math.round(total / 2))}
                  className="h-10 px-4 rounded-xl border-2 border-border-strong bg-background text-sm font-bold hover:bg-secondary"
                >
                  অর্ধেক
                </button>
                <button
                  type="button"
                  onClick={() => setPaid(0)}
                  className="h-10 px-4 rounded-xl border-2 border-border-strong bg-background text-sm font-bold hover:bg-secondary"
                >
                  বাকি রাখুন
                </button>
              </div>
            </BigField>

            <div className="mt-3">
              <BigField label="নোট (ঐচ্ছিক)" icon={<StickyNote className="h-5 w-5" />}>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={2}
                  placeholder="বিশেষ কিছু থাকলে লিখুন..."
                  className={`${bigInput} h-auto py-3 text-base`}
                />
              </BigField>
            </div>
          </Step>
        </div>

        {/* Summary column */}
        <aside className="xl:col-span-1">
          <div className="sticky top-4 rounded-3xl border-2 border-border-strong bg-card shadow-card overflow-hidden">
            <div className="bg-primary text-primary-foreground p-5">
              <p className="text-sm opacity-80">মোট বিল</p>
              <p className="text-4xl font-extrabold mt-1">{bnMoney(total)}</p>
              <p className="text-xs mt-2 opacity-80">
                {bnNum(qty)} পিস × ৳{toBn(price)}
              </p>
            </div>
            <div className="p-5 space-y-3">
              <SummaryRow label="কাস্টমার" value={customer || "—"} />
              <SummaryRow label="ইট" value={brick.name} />
              <SummaryRow label="পেমেন্ট" value={mode} />
              <div className="rounded-2xl border-2 border-border-strong bg-secondary/60 p-4">
                <div className="flex justify-between text-sm font-semibold">
                  <span>টাকা পেলাম</span>
                  <span className="text-success">{bnMoney(paid)}</span>
                </div>
                <div className="mt-2 flex justify-between text-base font-bold">
                  <span>বাকি থাকল</span>
                  <span className={due > 0 ? "text-destructive" : "text-success"}>
                    {bnMoney(due)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={save}
                className="h-14 w-full rounded-2xl bg-success text-white font-bold text-lg inline-flex items-center justify-center gap-2 shadow-card hover:opacity-90 active:translate-y-0.5"
              >
                <Check className="h-5 w-5" /> বিক্রি সংরক্ষণ করুন
              </button>
              <button
                type="button"
                onClick={reset}
                className="h-11 w-full rounded-xl border-2 border-border-strong bg-background font-semibold hover:bg-secondary"
              >
                নতুন বিল
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Recent sales */}
      <div className="rounded-2xl border-2 border-border-strong bg-card shadow-card">
        <div className="border-b-2 border-border-strong px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            <h3 className="text-base font-bold">আজকের বিক্রি</h3>
          </div>
          <span className="text-sm font-semibold text-muted-foreground">
            মোট {bnNum(sales.length)} টি
          </span>
        </div>
        {sales.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground">
            <ShoppingBag className="h-10 w-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">এখনো কোন বিক্রি যোগ করা হয়নি</p>
          </div>
        ) : (
          <ul className="divide-y-2 divide-border">
            {sales.map((s) => (
              <li
                key={s.id}
                className="p-4 flex flex-wrap items-center gap-3 hover:bg-secondary/30"
              >
                <div className="h-12 w-12 rounded-xl bg-secondary border-2 border-border-strong flex items-center justify-center font-bold">
                  {s.customer.slice(0, 1)}
                </div>
                <div className="flex-1 min-w-[180px]">
                  <p className="font-bold">{s.customer}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    {new Date(s.date).toLocaleString("bn-BD", {
                      hour: "2-digit",
                      minute: "2-digit",
                      day: "numeric",
                      month: "short",
                    })}
                    <span>•</span>
                    {s.brickType} — {bnNum(s.qty)} পিস
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{bnMoney(s.total)}</p>
                  {s.due > 0 ? (
                    <p className="text-xs font-semibold text-destructive">
                      বাকি {bnMoney(s.due)}
                    </p>
                  ) : (
                    <p className="text-xs font-semibold text-success">পরিশোধিত</p>
                  )}
                </div>
                <button
                  onClick={() => {
                    if (confirm("মুছে ফেলবেন?")) remove(s.id);
                  }}
                  className="h-10 w-10 rounded-xl border-2 border-border-strong bg-background hover:bg-destructive/10 hover:border-destructive hover:text-destructive inline-flex items-center justify-center"
                  aria-label="মুছুন"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppLayout>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border-2 border-border-strong bg-card shadow-card">
      <div className="border-b-2 border-border-strong px-5 py-4 flex items-center gap-3">
        <span className="h-9 w-9 rounded-xl bg-primary text-primary-foreground inline-flex items-center justify-center font-bold">
          {n}
        </span>
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function BigField({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold text-right max-w-[60%] truncate">{value}</span>
    </div>
  );
}
