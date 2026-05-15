import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Users2,
  Search,
  Plus,
  Save,
  Pencil,
  Trash2,
  Phone,
  MapPin,
  StickyNote,
  Wallet,
  CircleDot,
  User,
  Truck,
  Briefcase,
  Receipt,
  Banknote,
  Building2,
  Crown,
  HandCoins,
} from "lucide-react";
import { AppLayout } from "@/components/dashboard/AppLayout";
import { PageHeader } from "@/components/dashboard/PageHeader";

export const Route = createFileRoute("/accounts/list")({
  component: AccountsListPage,
});

type AccType =
  | "Customer"
  | "Supplier"
  | "Employee"
  | "Expense"
  | "Cash"
  | "Bank"
  | "Owner"
  | "Loan";
type Status = "Active" | "Inactive";
type BalType = "Receive" | "Payable";

type Account = {
  id: string;
  name: string;
  type: AccType;
  phone: string;
  status: Status;
  opening: number;
  balType: BalType;
  address: string;
  note: string;
};

const TYPE_META: Record<AccType, { label: string; icon: any; tone: string }> = {
  Customer: { label: "কাস্টমার", icon: User, tone: "text-primary" },
  Supplier: { label: "সাপ্লায়ার", icon: Truck, tone: "text-warning" },
  Employee: { label: "কর্মচারী", icon: Briefcase, tone: "text-success" },
  Expense: { label: "খরচ", icon: Receipt, tone: "text-destructive" },
  Cash: { label: "ক্যাশ", icon: Banknote, tone: "text-success" },
  Bank: { label: "ব্যাংক", icon: Building2, tone: "text-primary" },
  Owner: { label: "মালিক", icon: Crown, tone: "text-warning" },
  Loan: { label: "ঋণ", icon: HandCoins, tone: "text-destructive" },
};

const TYPES = Object.keys(TYPE_META) as AccType[];

const seed: Account[] = [
  { id: "1", name: "করিম ট্রেডার্স", type: "Customer", phone: "01711-223344", status: "Active", opening: 25000, balType: "Receive", address: "সাভার, ঢাকা", note: "নিয়মিত কাস্টমার" },
  { id: "2", name: "হাসান বিল্ডার্স", type: "Customer", phone: "01811-556677", status: "Active", opening: 50000, balType: "Receive", address: "গাজীপুর", note: "" },
  { id: "3", name: "রহমান কোল সাপ্লাই", type: "Supplier", phone: "01911-998877", status: "Active", opening: 18000, balType: "Payable", address: "চট্টগ্রাম", note: "কয়লা সরবরাহকারী" },
  { id: "4", name: "মাটি ডিপো — শফিক", type: "Supplier", phone: "01511-334455", status: "Active", opening: 7200, balType: "Payable", address: "মানিকগঞ্জ", note: "" },
  { id: "5", name: "জসিম উদ্দিন", type: "Employee", phone: "01611-112233", status: "Active", opening: 0, balType: "Payable", address: "ভাটা এলাকা", note: "ফায়ারম্যান" },
  { id: "6", name: "সিটি ব্যাংক — ০১২৩", type: "Bank", phone: "", status: "Active", opening: 240000, balType: "Receive", address: "ধানমন্ডি শাখা", note: "চলতি হিসাব" },
  { id: "7", name: "অফিস ক্যাশ", type: "Cash", phone: "", status: "Active", opening: 32000, balType: "Receive", address: "", note: "" },
  { id: "8", name: "মালিক — ফারুক সাহেব", type: "Owner", phone: "01711-000000", status: "Active", opening: 500000, balType: "Payable", address: "", note: "মূলধন" },
];

const bn = (n: number) =>
  n.toLocaleString("bn-BD", { maximumFractionDigits: 0 });

const empty: Omit<Account, "id"> = {
  name: "",
  type: "Customer",
  phone: "",
  status: "Active",
  opening: 0,
  balType: "Receive",
  address: "",
  note: "",
};

function AccountsListPage() {
  const [list, setList] = useState<Account[]>(seed);
  const [form, setForm] = useState<Omit<Account, "id">>(empty);
  const [editId, setEditId] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<AccType | "All">("All");

  const filtered = useMemo(
    () =>
      list.filter(
        (a) =>
          (filter === "All" || a.type === filter) &&
          (q === "" ||
            a.name.toLowerCase().includes(q.toLowerCase()) ||
            a.phone.includes(q)),
      ),
    [list, q, filter],
  );

  const totals = useMemo(() => {
    const recv = list
      .filter((a) => a.balType === "Receive")
      .reduce((s, a) => s + a.opening, 0);
    const pay = list
      .filter((a) => a.balType === "Payable")
      .reduce((s, a) => s + a.opening, 0);
    return { recv, pay, count: list.length };
  }, [list]);

  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  const reset = () => {
    setForm(empty);
    setEditId(null);
  };

  const save = () => {
    if (!form.name.trim()) return;
    if (editId) {
      setList((p) => p.map((a) => (a.id === editId ? { ...form, id: editId } : a)));
    } else {
      setList((p) => [{ ...form, id: String(Date.now()) }, ...p]);
    }
    reset();
  };

  const edit = (a: Account) => {
    setEditId(a.id);
    const { id: _id, ...rest } = a;
    setForm(rest);
  };

  const remove = (id: string) =>
    setList((p) => p.filter((a) => a.id !== id));

  return (
    <AppLayout>
      <PageHeader
        icon={Users2}
        title="অ্যাকাউন্ট মডিউল"
        subtitle="কাস্টমার, সাপ্লায়ার, কর্মচারী, ক্যাশ, ব্যাংক — সব হিসাব এক জায়গায়"
      />

      {/* Summary */}
      <section className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-border-strong bg-secondary text-primary">
              <Users2 className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm text-muted-foreground">মোট অ্যাকাউন্ট</p>
              <p className="text-2xl font-bold">{bn(totals.count)} টি</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-border-strong bg-secondary text-success">
              <Wallet className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm text-muted-foreground">মোট পাওনা (Receive)</p>
              <p className="text-2xl font-bold text-success">৳ {bn(totals.recv)}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-border-strong bg-secondary text-destructive">
              <HandCoins className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm text-muted-foreground">মোট দেনা (Payable)</p>
              <p className="text-2xl font-bold text-destructive">৳ {bn(totals.pay)}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* FORM — col-4 */}
        <div className="lg:col-span-4 rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card h-fit">
          <div className="flex items-center justify-between border-b-2 border-border-strong pb-3">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              {editId ? "অ্যাকাউন্ট সম্পাদনা" : "নতুন অ্যাকাউন্ট"}
            </h3>
            {editId && (
              <button
                onClick={reset}
                className="text-xs font-semibold text-muted-foreground underline"
              >
                বাতিল
              </button>
            )}
          </div>

          <div className="mt-4 space-y-4">
            {/* Name */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold">নাম *</label>
              <input
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="যেমন: করিম ট্রেডার্স"
                className="h-11 w-full rounded-xl border-2 border-border bg-background px-3 text-sm focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-ring/30"
              />
            </div>

            {/* Type */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold">টাইপ</label>
              <div className="grid grid-cols-2 gap-2">
                {TYPES.map((t) => {
                  const m = TYPE_META[t];
                  const active = form.type === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => update("type", t)}
                      className={`flex items-center gap-2 h-10 rounded-xl border-2 px-2.5 text-xs font-bold transition-all ${
                        active
                          ? "border-border-strong bg-secondary shadow-card"
                          : "border-border bg-background hover:border-border-strong"
                      }`}
                    >
                      <m.icon className={`h-4 w-4 ${active ? m.tone : "text-muted-foreground"}`} />
                      <span className="truncate">{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold flex items-center gap-1.5">
                <Phone className="h-4 w-4" /> ফোন
              </label>
              <input
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="01XXX-XXXXXX"
                className="h-11 w-full rounded-xl border-2 border-border bg-background px-3 text-sm focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-ring/30"
              />
            </div>

            {/* Status */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold">স্ট্যাটাস</label>
              <div className="grid grid-cols-2 gap-2">
                {(["Active", "Inactive"] as Status[]).map((s) => {
                  const active = form.status === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => update("status", s)}
                      className={`flex items-center justify-center gap-2 h-11 rounded-xl border-2 text-sm font-bold ${
                        active
                          ? s === "Active"
                            ? "border-success bg-success text-success-foreground"
                            : "border-border-strong bg-muted text-foreground"
                          : "border-border bg-background text-muted-foreground hover:border-border-strong"
                      }`}
                    >
                      <CircleDot className="h-4 w-4" />
                      {s === "Active" ? "চালু" : "বন্ধ"}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Opening Balance + type */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="mb-1.5 block text-sm font-semibold">ওপেনিং ব্যালেন্স</label>
                <div className="flex items-center h-11 rounded-xl border-2 border-border bg-background px-3 focus-within:border-border-strong focus-within:ring-2 focus-within:ring-ring/30">
                  <span className="text-base font-bold text-primary">৳</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={form.opening || ""}
                    onChange={(e) =>
                      update("opening", Number(e.target.value.replace(/[^\d]/g, "")) || 0)
                    }
                    placeholder="০"
                    className="ml-2 flex-1 bg-transparent text-base font-bold focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold">ব্যালেন্স টাইপ</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(["Receive", "Payable"] as BalType[]).map((b) => {
                    const active = form.balType === b;
                    return (
                      <button
                        key={b}
                        type="button"
                        onClick={() => update("balType", b)}
                        className={`h-11 rounded-xl border-2 text-xs font-bold ${
                          active
                            ? b === "Receive"
                              ? "border-success bg-success text-success-foreground"
                              : "border-destructive bg-destructive text-destructive-foreground"
                            : "border-border bg-background text-muted-foreground hover:border-border-strong"
                        }`}
                      >
                        {b === "Receive" ? "পাবো" : "দিবো"}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> ঠিকানা
              </label>
              <input
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                placeholder="গ্রাম / এলাকা / জেলা"
                className="h-11 w-full rounded-xl border-2 border-border bg-background px-3 text-sm focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-ring/30"
              />
            </div>

            {/* Note */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold flex items-center gap-1.5">
                <StickyNote className="h-4 w-4" /> নোট
              </label>
              <textarea
                value={form.note}
                onChange={(e) => update("note", e.target.value)}
                rows={2}
                placeholder="অতিরিক্ত তথ্য (ঐচ্ছিক)"
                className="w-full rounded-xl border-2 border-border bg-background px-3 py-2 text-sm focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-ring/30 resize-none"
              />
            </div>

            <button
              type="button"
              onClick={save}
              className="mt-2 h-12 w-full rounded-xl border-2 border-primary bg-primary text-primary-foreground font-bold inline-flex items-center justify-center gap-2 hover:opacity-90 active:translate-y-0.5 shadow-card"
            >
              <Save className="h-5 w-5" />
              {editId ? "আপডেট করুন" : "সংরক্ষণ করুন"}
            </button>
          </div>
        </div>

        {/* LIST — col-8 */}
        <div className="lg:col-span-8 rounded-2xl border-2 border-border-strong bg-card shadow-card flex flex-col">
          <div className="flex flex-col gap-3 border-b-2 border-border-strong p-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-bold">অ্যাকাউন্ট তালিকা</h3>
              <span className="rounded-full border-2 border-border-strong bg-secondary px-3 py-0.5 text-xs font-bold">
                {bn(filtered.length)} টি
              </span>
            </div>

            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex items-center h-10 flex-1 rounded-xl border-2 border-border bg-background px-3 focus-within:border-border-strong">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="নাম বা ফোন দিয়ে খুঁজুন..."
                  className="ml-2 flex-1 bg-transparent text-sm focus:outline-none"
                />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(["All", ...TYPES] as const).map((t) => {
                  const active = filter === t;
                  const label = t === "All" ? "সব" : TYPE_META[t as AccType].label;
                  return (
                    <button
                      key={t}
                      onClick={() => setFilter(t as any)}
                      className={`h-10 px-3 rounded-xl border-2 text-xs font-bold whitespace-nowrap ${
                        active
                          ? "border-border-strong bg-secondary shadow-card"
                          : "border-border bg-background text-muted-foreground hover:border-border-strong"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-border-strong bg-secondary/40 text-left">
                  <th className="px-4 py-3 font-bold">নাম</th>
                  <th className="px-4 py-3 font-bold">টাইপ</th>
                  <th className="px-4 py-3 font-bold">ফোন</th>
                  <th className="px-4 py-3 font-bold text-right">ব্যালেন্স</th>
                  <th className="px-4 py-3 font-bold text-center">স্ট্যাটাস</th>
                  <th className="px-4 py-3 font-bold text-right">কাজ</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                      কোনো অ্যাকাউন্ট পাওয়া যায়নি
                    </td>
                  </tr>
                ) : (
                  filtered.map((a) => {
                    const m = TYPE_META[a.type];
                    return (
                      <tr key={a.id} className="border-b border-border hover:bg-secondary/30">
                        <td className="px-4 py-3">
                          <div className="font-semibold">{a.name}</div>
                          {a.address && (
                            <div className="text-xs text-muted-foreground">{a.address}</div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1.5 rounded-lg border-2 border-border bg-background px-2 py-1 text-xs font-bold">
                            <m.icon className={`h-3.5 w-3.5 ${m.tone}`} />
                            {m.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{a.phone || "—"}</td>
                        <td className="px-4 py-3 text-right">
                          <div
                            className={`font-bold ${
                              a.balType === "Receive" ? "text-success" : "text-destructive"
                            }`}
                          >
                            ৳ {bn(a.opening)}
                          </div>
                          <div className="text-[10px] font-semibold text-muted-foreground uppercase">
                            {a.balType === "Receive" ? "পাবো" : "দিবো"}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full border-2 px-2 py-0.5 text-[11px] font-bold ${
                              a.status === "Active"
                                ? "border-success bg-success/10 text-success"
                                : "border-border bg-muted text-muted-foreground"
                            }`}
                          >
                            <CircleDot className="h-3 w-3" />
                            {a.status === "Active" ? "চালু" : "বন্ধ"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => edit(a)}
                              className="h-8 w-8 inline-flex items-center justify-center rounded-lg border-2 border-border bg-background hover:bg-secondary"
                              title="সম্পাদনা"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => remove(a.id)}
                              className="h-8 w-8 inline-flex items-center justify-center rounded-lg border-2 border-destructive/40 bg-background text-destructive hover:bg-destructive/10"
                              title="মুছুন"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
