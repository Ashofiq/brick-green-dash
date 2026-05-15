import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingCart, Plus, Phone, Search, Eye, Printer } from "lucide-react";
import { AppLayout } from "@/components/dashboard/AppLayout";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Badge } from "./production";
import { orders, bnMoney, bnNum, statusTone, toBn, type OrderStatus } from "@/lib/orders-data";

export const Route = createFileRoute("/orders/")({
  component: OrdersPage,
});

const filters: ("সব" | OrderStatus)[] = ["সব", "নতুন", "চলমান", "সম্পন্ন", "বাতিল"];

function OrdersPage() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("সব");

  const list = orders.filter((o) => {
    if (filter !== "সব" && o.status !== filter) return false;
    if (!q) return true;
    return (
      o.customer.toLowerCase().includes(q.toLowerCase()) ||
      o.phone.includes(q) ||
      o.id.toLowerCase().includes(q.toLowerCase())
    );
  });

  const totalDue = orders.reduce((s, o) => s + (o.qty * o.unitPrice - o.advance), 0);

  return (
    <AppLayout>
      <PageHeader
        icon={ShoppingCart}
        title="কাস্টমার অর্ডার"
        subtitle="অর্ডার গ্রহণ, পরিচালনা ও ডেলিভারি ট্র্যাকিং"
        actions={
          <Link
            to="/orders/new"
            className="h-11 inline-flex items-center gap-2 rounded-xl border-2 border-success bg-primary px-4 text-sm font-bold text-primary-foreground hover:bg-success"
          >
            <Plus className="h-4 w-4" /> নতুন অর্ডার
          </Link>
        }
      />

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { l: "মোট অর্ডার", v: toBn(orders.length) },
          { l: "চলমান", v: toBn(orders.filter((o) => o.status === "চলমান" || o.status === "নতুন").length) },
          { l: "সম্পন্ন", v: toBn(orders.filter((o) => o.status === "সম্পন্ন").length) },
          { l: "মোট বকেয়া", v: bnMoney(totalDue) },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card">
            <p className="text-sm text-muted-foreground">{s.l}</p>
            <p className="mt-1 text-2xl font-bold">{s.v}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border-2 border-border-strong bg-card p-4 shadow-card">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="কাস্টমার, ফোন বা অর্ডার নং খুঁজুন..."
              className="h-12 w-full rounded-xl border-2 border-border bg-background pl-10 pr-3 text-sm font-medium focus:border-border-strong focus:outline-none"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`h-12 px-4 rounded-xl border-2 text-sm font-bold whitespace-nowrap transition-colors ${
                  filter === f
                    ? "border-success bg-primary text-primary-foreground"
                    : "border-border-strong bg-background hover:bg-secondary"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((o) => {
          const total = o.qty * o.unitPrice;
          const due = total - o.advance;
          return (
            <div key={o.id} className="rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-muted-foreground">#{toBn(o.id.replace("ORD-", ""))}</span>
                <Badge tone={statusTone(o.status)}>{o.status}</Badge>
              </div>
              <p className="mt-2 text-base font-bold">{o.customer}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                <Phone className="h-3 w-3" /> {o.phone}
              </p>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{o.address}</p>

              <div className="mt-3 grid grid-cols-2 gap-2 border-t-2 border-border pt-3">
                <div>
                  <p className="text-[11px] text-muted-foreground">পরিমাণ</p>
                  <p className="text-sm font-bold">{bnNum(o.qty)} <span className="text-xs font-normal text-muted-foreground">পিস</span></p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground">মোট মূল্য</p>
                  <p className="text-sm font-bold text-success">{bnMoney(total)}</p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground">অগ্রিম</p>
                  <p className="text-sm font-bold">{bnMoney(o.advance)}</p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground">বাকি</p>
                  <p className={`text-sm font-bold ${due > 0 ? "text-destructive" : ""}`}>{bnMoney(due)}</p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Link
                  to="/orders/$orderId"
                  params={{ orderId: o.id }}
                  className="flex-1 h-10 inline-flex items-center justify-center gap-1.5 rounded-xl border-2 border-border-strong bg-secondary text-sm font-semibold hover:bg-card"
                >
                  <Eye className="h-4 w-4" /> বিস্তারিত
                </Link>
                <Link
                  to="/orders/$orderId"
                  params={{ orderId: o.id }}
                  search={{ print: "1" }}
                  className="h-10 px-3 inline-flex items-center justify-center rounded-xl border-2 border-success bg-primary text-primary-foreground hover:bg-success"
                  aria-label="প্রিন্ট"
                >
                  <Printer className="h-4 w-4" />
                </Link>
              </div>
            </div>
          );
        })}
        {list.length === 0 && (
          <div className="col-span-full rounded-2xl border-2 border-dashed border-border-strong p-10 text-center text-muted-foreground">
            কোনো অর্ডার পাওয়া যায়নি
          </div>
        )}
      </section>
    </AppLayout>
  );
}
