import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Printer, Receipt, RotateCcw } from "lucide-react";
import { AppLayout } from "@/components/dashboard/AppLayout";
import { PageHeader } from "@/components/dashboard/PageHeader";

export const Route = createFileRoute("/voucher")({
  component: VoucherPage,
});

const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
const toBn = (n: number | string) => String(n).replace(/\d/g, (d) => bnDigits[Number(d)]);

// Bengali number to words (simple, up to crore)
const units = ["", "এক", "দুই", "তিন", "চার", "পাঁচ", "ছয়", "সাত", "আট", "নয়", "দশ",
  "এগারো", "বারো", "তেরো", "চৌদ্দ", "পনের", "ষোল", "সতের", "আঠার", "ঊনিশ", "বিশ",
  "একুশ", "বাইশ", "তেইশ", "চব্বিশ", "পঁচিশ", "ছাব্বিশ", "সাতাশ", "আঠাশ", "ঊনত্রিশ", "ত্রিশ",
  "একত্রিশ", "বত্রিশ", "তেত্রিশ", "চৌত্রিশ", "পঁইত্রিশ", "ছত্রিশ", "সাঁইত্রিশ", "আটত্রিশ", "ঊনচল্লিশ", "চল্লিশ",
  "একচল্লিশ", "বিয়াল্লিশ", "তেতাল্লিশ", "চুয়াল্লিশ", "পঁইতাল্লিশ", "ছেচল্লিশ", "সাতচল্লিশ", "আটচল্লিশ", "ঊনপঞ্চাশ", "পঞ্চাশ",
  "একান্ন", "বায়ান্ন", "তিপ্পান্ন", "চুয়ান্ন", "পঞ্চান্ন", "ছাপ্পান্ন", "সাতান্ন", "আটান্ন", "ঊনষাট", "ষাট",
  "একষট্টি", "বাষট্টি", "তেষট্টি", "চৌষট্টি", "পঁইষট্টি", "ছেষট্টি", "সাতষট্টি", "আটষট্টি", "ঊনসত্তর", "সত্তর",
  "একাত্তর", "বাহাত্তর", "তিয়াত্তর", "চুয়াত্তর", "পঁচাত্তর", "ছিয়াত্তর", "সাতাত্তর", "আটাত্তর", "ঊনআশি", "আশি",
  "একাশি", "বিরাশি", "তিরাশি", "চুরাশি", "পঁচাশি", "ছিয়াশি", "সাতাশি", "আটাশি", "ঊননব্বই", "নব্বই",
  "একানব্বই", "বিরানব্বই", "তিরানব্বই", "চুরানব্বই", "পঁচানব্বই", "ছিয়ানব্বই", "সাতানব্বই", "আটানব্বই", "নিরানব্বই"];

function inWords(num: number): string {
  if (num === 0) return "শূন্য";
  let n = Math.floor(num);
  const parts: string[] = [];
  const crore = Math.floor(n / 10000000); n %= 10000000;
  const lakh = Math.floor(n / 100000); n %= 100000;
  const thousand = Math.floor(n / 1000); n %= 1000;
  const hundred = Math.floor(n / 100); n %= 100;
  if (crore) parts.push(`${units[crore] || crore} কোটি`);
  if (lakh) parts.push(`${units[lakh] || lakh} লক্ষ`);
  if (thousand) parts.push(`${units[thousand] || thousand} হাজার`);
  if (hundred) parts.push(`${units[hundred]} শত`);
  if (n) parts.push(units[n]);
  return parts.join(" ");
}

function VoucherPage() {
  const today = new Date().toISOString().slice(0, 10);
  const [voucherNo, setVoucherNo] = useState("৪০০০");
  const [date, setDate] = useState(today);
  const [receivedFrom, setReceivedFrom] = useState("");
  const [amount, setAmount] = useState("");
  const [bank, setBank] = useState("");
  const [chequeNo, setChequeNo] = useState("");
  const [chequeDate, setChequeDate] = useState("");
  const [paymentMode, setPaymentMode] = useState<"নগদ" | "চেক">("নগদ");
  const [being, setBeing] = useState("");

  const amt = Number(amount) || 0;
  const taka = Math.floor(amt);
  const paisa = Math.round((amt - taka) * 100);

  const formatDate = (d: string) => {
    if (!d) return "";
    const [y, m, day] = d.split("-");
    return `${toBn(day)}/${toBn(m)}/${toBn(y)}`;
  };

  const reset = () => {
    setReceivedFrom(""); setAmount(""); setBank(""); setChequeNo("");
    setChequeDate(""); setBeing("");
  };

  return (
    <AppLayout>
      <div className="no-print">
        <PageHeader
          icon={Receipt}
          title="রিসিট ভাউচার"
          subtitle="টাকা গ্রহণের রসিদ — পূরণ করুন ও প্রিন্ট করুন"
          actions={
            <>
              <button
                onClick={reset}
                className="inline-flex h-10 items-center gap-2 rounded-xl border-2 border-border bg-background px-4 text-sm font-bold hover:bg-secondary"
              >
                <RotateCcw className="h-4 w-4" /> রিসেট
              </button>
              <button
                onClick={() => window.print()}
                className="inline-flex h-10 items-center gap-2 rounded-xl border-2 border-success bg-primary px-4 text-sm font-bold text-primary-foreground"
              >
                <Printer className="h-4 w-4" /> প্রিন্ট
              </button>
            </>
          }
        />
      </div>

      <div className="no-print grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        {/* Form */}
        <div className="rounded-2xl border-2 border-border-strong bg-card p-5 shadow-card space-y-4">
          <h3 className="text-lg font-bold border-b-2 border-border-strong pb-3">তথ্য পূরণ করুন</h3>

          <div className="grid grid-cols-2 gap-3">
            <Field label="ভাউচার নং">
              <input value={voucherNo} onChange={(e) => setVoucherNo(e.target.value)}
                className="input" />
            </Field>
            <Field label="তারিখ">
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                className="input" />
            </Field>
          </div>

          <Field label="গ্রহীতা / কার কাছ থেকে">
            <input value={receivedFrom} onChange={(e) => setReceivedFrom(e.target.value)}
              placeholder="মেসার্স / জনাব ..." className="input" />
          </Field>

          <Field label="টাকার পরিমাণ (৳)">
            <input value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
              inputMode="decimal" placeholder="0" className="input text-lg font-bold" />
            {amt > 0 && (
              <p className="mt-1 text-xs text-muted-foreground">
                কথায়: <span className="font-semibold text-foreground">{inWords(taka)} টাকা{paisa ? ` ${inWords(paisa)} পয়সা` : ""} মাত্র</span>
              </p>
            )}
          </Field>

          <div>
            <label className="mb-1.5 block text-sm font-semibold">পরিশোধের ধরন</label>
            <div className="flex gap-2">
              {(["নগদ", "চেক"] as const).map((m) => (
                <button key={m} type="button" onClick={() => setPaymentMode(m)}
                  className={`flex-1 h-11 rounded-xl border-2 text-sm font-bold transition ${
                    paymentMode === m
                      ? "border-success bg-primary text-primary-foreground"
                      : "border-border bg-background hover:bg-secondary"
                  }`}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          {paymentMode === "চেক" && (
            <div className="grid grid-cols-2 gap-3">
              <Field label="ব্যাংকের নাম">
                <input value={bank} onChange={(e) => setBank(e.target.value)} className="input" />
              </Field>
              <Field label="চেক নং">
                <input value={chequeNo} onChange={(e) => setChequeNo(e.target.value)} className="input" />
              </Field>
              <Field label="চেকের তারিখ">
                <input type="date" value={chequeDate} onChange={(e) => setChequeDate(e.target.value)} className="input" />
              </Field>
            </div>
          )}

          <Field label="বিবরণ / কারণে">
            <textarea value={being} onChange={(e) => setBeing(e.target.value)} rows={3}
              placeholder="যেমন: মে মাসের ইট সরবরাহের অগ্রিম ..."
              className="w-full rounded-xl border-2 border-border bg-background p-3 text-sm focus:border-border-strong focus:outline-none" />
          </Field>
        </div>

        {/* Live preview */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">প্রিভিউ</p>
          <VoucherDoc
            voucherNo={voucherNo}
            dateText={formatDate(date)}
            receivedFrom={receivedFrom}
            amount={amt}
            words={amt > 0 ? `${inWords(taka)} টাকা${paisa ? ` ${inWords(paisa)} পয়সা` : ""} মাত্র` : ""}
            bank={bank}
            chequeNo={chequeNo}
            chequeDate={formatDate(chequeDate)}
            paymentMode={paymentMode}
            being={being}
          />
        </div>
      </div>

      {/* Print area */}
      <div className="print-area hidden print:block">
        <VoucherDoc
          voucherNo={voucherNo}
          dateText={formatDate(date)}
          receivedFrom={receivedFrom}
          amount={amt}
          words={amt > 0 ? `${inWords(taka)} টাকা${paisa ? ` ${inWords(paisa)} পয়সা` : ""} মাত্র` : ""}
          bank={bank}
          chequeNo={chequeNo}
          chequeDate={formatDate(chequeDate)}
          paymentMode={paymentMode}
          being={being}
        />
      </div>

      <style>{`
        .input { height: 2.75rem; width: 100%; border-radius: 0.75rem; border-width: 2px;
          border-color: var(--border); background: var(--background); padding: 0 0.75rem;
          font-size: 0.875rem; outline: none; }
        .input:focus { border-color: var(--border-strong); }
      `}</style>
    </AppLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold">{label}</label>
      {children}
    </div>
  );
}

type DocProps = {
  voucherNo: string;
  dateText: string;
  receivedFrom: string;
  amount: number;
  words: string;
  bank: string;
  chequeNo: string;
  chequeDate: string;
  paymentMode: "নগদ" | "চেক";
  being: string;
};

function VoucherDoc(p: DocProps) {
  const taka = Math.floor(p.amount);
  const paisa = Math.round((p.amount - taka) * 100);

  return (
    <div className="mx-auto w-full max-w-3xl bg-white text-black border-2 border-black rounded-md overflow-hidden font-[Hind_Siliguri]">
      {/* Header */}
      <div className="flex items-stretch border-b-2 border-black">
        <div className="flex h-28 w-28 shrink-0 flex-col items-center justify-center border-r-2 border-black bg-black text-white">
          <div className="text-[10px] font-bold tracking-widest">রয়েল</div>
          <div className="text-base font-black">এক্সিলেন্ট</div>
          <div className="mt-1 text-[8px] tracking-widest border-t border-white pt-0.5">ইট ভাটা</div>
        </div>
        <div className="flex-1 px-4 py-3 text-center">
          <h2 className="text-lg font-black tracking-tight">রয়েল এক্সিলেন্ট ব্রিকস ইন্ডাস্ট্রিজ লিমিটেড</h2>
          <p className="text-[11px] mt-0.5">বাজার রোড, সাভার, ঢাকা — ১৩৪০</p>
          <p className="text-[11px]">মোবাইল: ০১৭১১-১২৩৪৫৬, ০১৮২২-৬৫৪৩২১</p>
          <p className="text-[11px]">ইমেইল: sales@royalexcellent.bd · www.royalexcellent.bd</p>
          <p className="text-[11px] font-semibold">টিআরএন: ১০০২০৮৬৪০১০০০০৩</p>
        </div>
      </div>

      {/* Amount box + title row */}
      <div className="flex items-stretch border-b-2 border-black">
        <div className="flex w-56 shrink-0 flex-col border-r-2 border-black">
          <div className="grid grid-cols-2 border-b border-black text-center text-[10px] font-bold">
            <div className="border-r border-black py-1">টাকা</div>
            <div className="py-1">পয়সা</div>
          </div>
          <div className="grid grid-cols-2 flex-1 text-center text-lg font-bold">
            <div className="border-r border-black py-2">{p.amount > 0 ? toBn(taka.toLocaleString("en-IN")) : ""}</div>
            <div className="py-2">{p.amount > 0 ? toBn(paisa.toString().padStart(2, "0")) : ""}</div>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center py-3">
          <h3 className="text-2xl font-black tracking-wide border-b-2 border-black px-6 pb-1">রিসিট ভাউচার</h3>
          <p className="mt-1 text-xs text-gray-600">টাকা গ্রহণের রসিদ</p>
        </div>
        <div className="flex w-48 shrink-0 flex-col items-end justify-center border-l-2 border-black px-3 text-sm">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold">নং:</span>
            <span className="text-red-600 text-xl font-black">{p.voucherNo || "—"}</span>
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-semibold">তারিখ:</span>
            <span>{p.dateText || "—"}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-5 px-6 py-5 text-sm">
        <Row label="গ্রহণ করা হলো / পরিশোধ করা হলো জনাব / মেসার্স:">
          {p.receivedFrom}
        </Row>
        <Row label="টাকার পরিমাণ (কথায়):">
          {p.words}
        </Row>
        <Row label="ব্যাংক:">
          {p.bank}
        </Row>
        <div className="grid grid-cols-2 gap-6">
          <Row label="তারিখ:">{p.dateText}</Row>
          <Row label={p.paymentMode === "চেক" ? "চেক নং:" : "নগদ / চেক নং:"}>
            {p.paymentMode === "চেক" ? `${p.chequeNo}${p.chequeDate ? ` (${p.chequeDate})` : ""}` : "নগদ"}
          </Row>
        </div>
        <Row label="যাহার দরুন / বিবরণ:">
          {p.being}
        </Row>
      </div>

      {/* Signatures */}
      <div className="grid grid-cols-2 gap-6 border-t-2 border-black px-6 pb-5 pt-10 text-sm">
        <div className="text-center">
          <div className="border-t border-black pt-1 font-semibold">হিসাবরক্ষকের স্বাক্ষর</div>
        </div>
        <div className="text-center">
          <div className="border-t border-black pt-1 font-semibold">গ্রহীতার স্বাক্ষর</div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-end gap-2">
      <span className="whitespace-nowrap font-semibold">{label}</span>
      <span className="flex-1 border-b border-dotted border-black pb-0.5 min-h-[1.25rem]">
        {children}
      </span>
    </div>
  );
}
