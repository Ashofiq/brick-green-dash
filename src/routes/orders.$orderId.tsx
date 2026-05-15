import { useEffect } from "react";
import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import {
  ArrowLeft,
  Printer,
  Phone,
  MapPin,
  Calendar,
  User,
  Layers,
  CheckCircle2,
  Truck,
} from "lucide-react";
import { AppLayout } from "@/components/dashboard/AppLayout";
import { Badge } from "./production";
import { getOrderById, bnMoney, bnNum, statusTone, toBn } from "@/lib/orders-data";

export const Route = createFileRoute("/orders/$orderId")({
  component: OrderDetailsPage,
  validateSearch: (s: Record<string, unknown>) => ({
    print: typeof s.print === "string" ? s.print : undefined,
  }),
});

function OrderDetailsPage() {
  const { orderId } = Route.useParams();
  const { print } = useSearch({ from: "/orders/$orderId" });
  const order = getOrderById(orderId);

  useEffect(() => {
    if (print && order) {
      const t = setTimeout(() => window.print(), 350);
      return () => clearTimeout(t);
    }
  }, [print, order]);

  if (!order) {
    return (
      <AppLayout>
        <div className="rounded-2xl border-2 border-border-strong bg-card p-10 text-center">
          <p className="text-lg font-bold">অর্ডার পাওয়া যায়নি</p>
          <Link to="/orders" className="mt-4 inline-flex h-11 items-center rounded-xl border-2 border-border-strong bg-background px-4 font-semibold">
            ফিরে যান
          </Link>
        </div>
      </AppLayout>
    );
  }

  const total = order.qty * order.unitPrice;
  const due = total - order.advance;

  return (
    <AppLayout>
      <div className="no-print flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            to="/orders"
            className="h-10 w-10 inline-flex items-center justify-center rounded-xl border-2 border-border-strong bg-card hover:bg-secondary"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <p className="text-xs font-semibold text-muted-foreground">অর্ডার নং</p>
            <h1 className="text-2xl font-bold tracking-tight">#{toBn(order.id.replace("ORD-", ""))}</h1>
          </div>
          <Badge tone={statusTone(order.status)}>{order.status}</Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => window.print()}
            className="h-11 inline-flex items-center gap-2 rounded-xl border-2 border-border-strong bg-card px-4 text-sm font-semibold hover:bg-secondary"
          >
            <Printer className="h-4 w-4" /> প্রিন্ট ইনভয়েস
          </button>
          <button className="h-11 inline-flex items-center gap-2 rounded-xl border-2 border-success bg-primary px-4 text-sm font-bold text-primary-foreground hover:bg-success">
            <CheckCircle2 className="h-4 w-4" /> পেমেন্ট গ্রহণ
          </button>
        </div>
      </div>

      <div className="no-print grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <section className="rounded-2xl border-2 border-border-strong bg-card shadow-card">
            <div className="border-b-2 border-border-strong px-5 py-4">
              <h3 className="text-base font-bold">কাস্টমার তথ্য</h3>
            </div>
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow icon={User} label="নাম" value={order.customer} />
              <InfoRow icon={Phone} label="মোবাইল" value={order.phone} />
              <InfoRow icon={MapPin} label="ঠিকানা" value={order.address} />
              <InfoRow icon={Calendar} label="অর্ডারের তারিখ" value={order.orderDate} />
            </div>
          </section>

          <section className="rounded-2xl border-2 border-border-strong bg-card shadow-card">
            <div className="border-b-2 border-border-strong px-5 py-4">
              <h3 className="text-base font-bold">ইটের বিবরণ</h3>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-secondary/40">
                <tr>
                  <th className="px-5 py-3 text-left font-bold border-b-2 border-border-strong">ধরন</th>
                  <th className="px-5 py-3 text-right font-bold border-b-2 border-border-strong">পরিমাণ</th>
                  <th className="px-5 py-3 text-right font-bold border-b-2 border-border-strong">দাম</th>
                  <th className="px-5 py-3 text-right font-bold border-b-2 border-border-strong">মোট</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-5 py-4 font-semibold">{order.brickType}</td>
                  <td className="px-5 py-4 text-right">{bnNum(order.qty)} পিস</td>
                  <td className="px-5 py-4 text-right">৳ {order.unitPrice}</td>
                  <td className="px-5 py-4 text-right font-bold text-success">{bnMoney(total)}</td>
                </tr>
              </tbody>
            </table>
          </section>

          {order.note && (
            <section className="rounded-2xl border-2 border-warning/40 bg-warning/10 p-5">
              <p className="text-xs font-bold uppercase text-warning-foreground">নোট</p>
              <p className="mt-1 text-sm">{order.note}</p>
            </section>
          )}
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border-2 border-border-strong bg-card shadow-card p-5">
            <h3 className="text-base font-bold border-b-2 border-border-strong pb-3">পেমেন্ট</h3>
            <div className="mt-4 space-y-3 text-sm">
              <Row k="মোট বিল" v={bnMoney(total)} />
              <Row k="অগ্রিম পরিশোধ" v={bnMoney(order.advance)} />
              <div className="rounded-xl border-2 border-border-strong bg-secondary p-3 flex justify-between items-center">
                <span className="text-sm font-bold">বাকি</span>
                <span className="text-xl font-bold text-success">{bnMoney(due)}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-border-strong bg-card shadow-card p-5">
            <h3 className="text-base font-bold border-b-2 border-border-strong pb-3">ডেলিভারি</h3>
            <div className="mt-4 space-y-3 text-sm">
              <InfoRow icon={Calendar} label="তারিখ" value={order.deliveryDate} />
              <InfoRow icon={Truck} label="অবস্থা" value={order.status} />
              <InfoRow icon={Layers} label="পরিমাণ" value={`${bnNum(order.qty)} পিস`} />
            </div>
          </div>
        </aside>
      </div>

      {/* Printable invoice */}
      <div className="print-area hidden print:block">
        <Invoice
          order={order}
          total={total}
          due={due}
        />
      </div>
    </AppLayout>
  );
}

function Invoice({
  order,
  total,
  due,
}: {
  order: ReturnType<typeof getOrderById> & {};
  total: number;
  due: number;
}) {
  if (!order) return null;
  return (
    <div className="text-black bg-white" style={{ fontFamily: "Hind Siliguri, sans-serif" }}>
      <div className="flex items-start justify-between border-b-4 border-black pb-4">
        <div>
          <h1 className="text-3xl font-extrabold">সবুজ ইট ভাটা</h1>
          <p className="text-sm">গ্রাম: রহিমপুর, উপজেলা: সাভার, ঢাকা</p>
          <p className="text-sm">মোবাইল: ০১৭০০-০০০০০০</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">ইনভয়েস</p>
          <p className="text-sm font-semibold">নং: #{toBn(order.id.replace("ORD-", ""))}</p>
          <p className="text-sm">তারিখ: {order.orderDate}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="border-2 border-black p-3">
          <p className="text-xs font-bold uppercase">কাস্টমার</p>
          <p className="text-base font-bold mt-1">{order.customer}</p>
          <p className="text-sm">{order.address}</p>
          <p className="text-sm">মোবাইল: {order.phone}</p>
        </div>
        <div className="border-2 border-black p-3">
          <p className="text-xs font-bold uppercase">ডেলিভারি</p>
          <p className="text-sm mt-1">তারিখ: {order.deliveryDate}</p>
          <p className="text-sm">অবস্থা: {order.status}</p>
        </div>
      </div>

      <table className="w-full mt-6 border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border-2 border-black px-3 py-2 text-left">বিবরণ</th>
            <th className="border-2 border-black px-3 py-2 text-right">পরিমাণ</th>
            <th className="border-2 border-black px-3 py-2 text-right">দাম</th>
            <th className="border-2 border-black px-3 py-2 text-right">মোট</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-2 border-black px-3 py-2 font-semibold">{order.brickType}</td>
            <td className="border-2 border-black px-3 py-2 text-right">{bnNum(order.qty)} পিস</td>
            <td className="border-2 border-black px-3 py-2 text-right">৳ {order.unitPrice}</td>
            <td className="border-2 border-black px-3 py-2 text-right font-bold">{bnMoney(total)}</td>
          </tr>
          <tr>
            <td colSpan={3} className="border-2 border-black px-3 py-2 text-right font-semibold">মোট বিল</td>
            <td className="border-2 border-black px-3 py-2 text-right font-bold">{bnMoney(total)}</td>
          </tr>
          <tr>
            <td colSpan={3} className="border-2 border-black px-3 py-2 text-right font-semibold">অগ্রিম পরিশোধ</td>
            <td className="border-2 border-black px-3 py-2 text-right">{bnMoney(order.advance)}</td>
          </tr>
          <tr className="bg-gray-100">
            <td colSpan={3} className="border-2 border-black px-3 py-2 text-right font-bold">বাকি</td>
            <td className="border-2 border-black px-3 py-2 text-right font-extrabold">{bnMoney(due)}</td>
          </tr>
        </tbody>
      </table>

      {order.note && (
        <div className="mt-4 border-2 border-black p-3">
          <p className="text-xs font-bold uppercase">নোট</p>
          <p className="text-sm">{order.note}</p>
        </div>
      )}

      <div className="mt-16 grid grid-cols-2 gap-12">
        <div className="text-center">
          <div className="border-t-2 border-black pt-1 text-sm font-semibold">কাস্টমারের স্বাক্ষর</div>
        </div>
        <div className="text-center">
          <div className="border-t-2 border-black pt-1 text-sm font-semibold">কর্তৃপক্ষের স্বাক্ষর</div>
        </div>
      </div>

      <p className="mt-8 text-center text-xs">ধন্যবাদ — সবুজ ইট ভাটা</p>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof User; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border-2 border-border-strong bg-secondary text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-bold">{value}</p>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-semibold">{v}</span>
    </div>
  );
}
