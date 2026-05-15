import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ShoppingCart,
  User,
  Phone,
  MapPin,
  Layers,
  Calendar,
  Wallet,
  StickyNote,
  Check,
  ArrowLeft,
} from "lucide-react";
import { AppLayout } from "@/components/dashboard/AppLayout";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { bnMoney, bnNum } from "@/lib/orders-data";

export const Route = createFileRoute("/orders/new")({
  component: NewOrderPage,
});

const brickTypes = [
  { name: "১ নম্বর ইট", price: 8.5 },
  { name: "২ নম্বর ইট", price: 7 },
  { name: "পিকেট ইট", price: 10 },
  { name: "কাঁচা ইট", price: 5 },
];

const inputCls =
  "h-12 w-full rounded-xl border-2 border-border bg-background px-3 text-sm font-medium focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-ring/30";

function NewOrderPage() {
  const nav = useNavigate();
  const [brick, setBrick] = useState(brickTypes[0]);
  const [qty, setQty] = useState(10000);
  const [price, setPrice] = useState(brickTypes[0].price);
  const [advance, setAdvance] = useState(0);

  const total = qty * price;
  const due = total - advance;

  const onSelectBrick = (b: (typeof brickTypes)[number]) => {
    setBrick(b);
    setPrice(b.price);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nav({ to: "/orders" });
  };

  return (
    <AppLayout>
      <div className="flex items-center gap-2">
        <Link
          to="/orders"
          className="h-10 w-10 inline-flex items-center justify-center rounded-xl border-2 border-border-strong bg-card hover:bg-secondary"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <PageHeader
          icon={ShoppingCart}
          title="নতুন অর্ডার"
          subtitle="কাস্টমার ও ইটের তথ্য পূরণ করুন"
        />
      </div>

      <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <Card title="১. কাস্টমার তথ্য">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="কাস্টমারের নাম" icon={<User className="h-4 w-4" />}>
                <input required placeholder="যেমন: করিম ট্রেডার্স" className={inputCls} />
              </Field>
              <Field label="মোবাইল নম্বর" icon={<Phone className="h-4 w-4" />}>
                <input required type="tel" placeholder="০১৭xxxxxxxx" className={inputCls} />
              </Field>
              <div className="sm:col-span-2">
                <Field label="ঠিকানা" icon={<MapPin className="h-4 w-4" />}>
                  <input placeholder="ডেলিভারি ঠিকানা" className={inputCls} />
                </Field>
              </div>
            </div>
          </Card>

          <Card title="২. ইটের ধরন">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {brickTypes.map((b) => {
                const active = brick.name === b.name;
                return (
                  <button
                    key={b.name}
                    type="button"
                    onClick={() => onSelectBrick(b)}
                    className={`rounded-xl border-2 p-4 text-left transition-colors ${
                      active
                        ? "border-success bg-secondary"
                        : "border-border-strong bg-background hover:bg-secondary/40"
                    }`}
                  >
                    <Layers className={`h-5 w-5 ${active ? "text-primary" : "text-muted-foreground"}`} />
                    <p className="mt-2 text-sm font-bold">{b.name}</p>
                    <p className="text-xs text-muted-foreground">৳ {b.price}/পিস</p>
                  </button>
                );
              })}
            </div>
          </Card>

          <Card title="৩. পরিমাণ ও মূল্য">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="পরিমাণ (পিস)" icon={<Layers className="h-4 w-4" />}>
                <input
                  required
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value) || 0)}
                  className={inputCls}
                />
              </Field>
              <Field label="প্রতি পিস দাম (৳)">
                <input
                  required
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value) || 0)}
                  className={inputCls}
                />
              </Field>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {[5000, 10000, 15000, 25000, 50000].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setQty(n)}
                  className="h-10 px-3 rounded-xl border-2 border-border-strong bg-background text-sm font-semibold hover:bg-secondary"
                >
                  {bnNum(n)}
                </button>
              ))}
            </div>
          </Card>

          <Card title="৪. ডেলিভারি ও অগ্রিম">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="ডেলিভারি তারিখ" icon={<Calendar className="h-4 w-4" />}>
                <input
                  required
                  type="date"
                  defaultValue={new Date(Date.now() + 5 * 86400000).toISOString().slice(0, 10)}
                  className={inputCls}
                />
              </Field>
              <Field label="অগ্রিম গ্রহণ (৳)" icon={<Wallet className="h-4 w-4" />}>
                <input
                  type="number"
                  value={advance}
                  onChange={(e) => setAdvance(Number(e.target.value) || 0)}
                  className={inputCls}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="নোট (ঐচ্ছিক)" icon={<StickyNote className="h-4 w-4" />}>
                  <textarea
                    rows={2}
                    placeholder="বিশেষ নির্দেশনা..."
                    className={`${inputCls} h-auto py-2`}
                  />
                </Field>
              </div>
            </div>
          </Card>
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-4 rounded-2xl border-2 border-border-strong bg-card shadow-card">
            <div className="border-b-2 border-border-strong p-5">
              <h3 className="text-lg font-bold">অর্ডার সারাংশ</h3>
            </div>
            <div className="p-5 space-y-3">
              <Row k="ইটের ধরন" v={brick.name} />
              <Row k="পরিমাণ" v={`${bnNum(qty)} পিস`} />
              <Row k="প্রতি পিস" v={`৳ ${price}`} />
              <div className="border-t-2 border-dashed border-border pt-3">
                <Row k="মোট মূল্য" v={bnMoney(total)} bold />
                <Row k="অগ্রিম" v={bnMoney(advance)} />
                <div className="mt-3 rounded-xl border-2 border-border-strong bg-secondary p-3 flex justify-between items-center">
                  <span className="text-sm font-bold">বাকি</span>
                  <span className="text-xl font-bold text-success">{bnMoney(due)}</span>
                </div>
              </div>
              <button
                type="submit"
                className="mt-2 h-12 w-full rounded-xl border-2 border-success bg-primary text-primary-foreground font-bold inline-flex items-center justify-center gap-2 hover:bg-success"
              >
                <Check className="h-5 w-5" /> অর্ডার সংরক্ষণ
              </button>
              <Link
                to="/orders"
                className="h-11 w-full rounded-xl border-2 border-border-strong bg-background font-semibold inline-flex items-center justify-center hover:bg-secondary"
              >
                বাতিল
              </Link>
            </div>
          </div>
        </aside>
      </form>
    </AppLayout>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border-2 border-border-strong bg-card shadow-card">
      <div className="border-b-2 border-border-strong px-5 py-4">
        <h3 className="text-base font-bold">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Field({
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
      <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold">
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}

function Row({ k, v, bold }: { k: string; v: string; bold?: boolean }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{k}</span>
      <span className={bold ? "font-bold" : "font-semibold"}>{v}</span>
    </div>
  );
}
