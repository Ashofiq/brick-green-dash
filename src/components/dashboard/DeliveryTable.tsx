import { Truck } from "lucide-react";

const rows = [
  { id: "DL-1024", customer: "করিম এন্টারপ্রাইজ", driver: "জসিম উদ্দিন", truck: "ঢাকা-মেট্রো-ট-১৪-৫৬৭৮", qty: "১২,০০০", location: "সাভার, ঢাকা", status: "ডেলিভার্ড" },
  { id: "DL-1025", customer: "রহমান কনস্ট্রাকশন", driver: "আলম মিয়া", truck: "চট্ট-ট-১১-৩৪৫৬", qty: "৮,৫০০", location: "নারায়ণগঞ্জ", status: "চলমান" },
  { id: "DL-1026", customer: "নিউ স্টার বিল্ডার্স", driver: "শফিক", truck: "ঢাকা-মেট্রো-ট-১৯-৭৭২২", qty: "১৫,০০০", location: "মানিকগঞ্জ", status: "লোডিং" },
  { id: "DL-1027", customer: "বাংলা হোমস", driver: "রফিক", truck: "ঢাকা-মেট্রো-ট-১২-৯৯০১", qty: "৬,০০০", location: "টাঙ্গাইল", status: "পেন্ডিং" },
];

const statusStyle: Record<string, string> = {
  "ডেলিভার্ড": "border-border-strong bg-secondary text-success",
  "চলমান": "border-warning/50 bg-warning/15 text-warning-foreground",
  "লোডিং": "border-border-strong bg-secondary text-primary",
  "পেন্ডিং": "border-destructive/40 bg-destructive/10 text-destructive",
};

export function DeliveryTable() {
  return (
    <div className="rounded-2xl border-2 border-border-strong bg-card shadow-card overflow-hidden">
      <div className="flex items-center justify-between border-b-2 border-border-strong p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-border-strong bg-secondary text-primary">
            <Truck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold">সাম্প্রতিক ডেলিভারি</h3>
            <p className="text-sm text-muted-foreground">আজকের ট্রাক ডেলিভারির তালিকা</p>
          </div>
        </div>
        <button className="hidden md:inline-flex h-10 items-center rounded-xl border-2 border-border-strong bg-card px-4 text-sm font-semibold hover:bg-secondary">
          সব দেখুন
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-secondary/60">
            <tr className="text-left text-xs font-bold uppercase tracking-wider text-secondary-foreground">
              <th className="border-b-2 border-border-strong px-5 py-3">আইডি</th>
              <th className="border-b-2 border-border-strong px-5 py-3">কাস্টমার</th>
              <th className="border-b-2 border-border-strong px-5 py-3">ড্রাইভার</th>
              <th className="border-b-2 border-border-strong px-5 py-3">ট্রাক</th>
              <th className="border-b-2 border-border-strong px-5 py-3">পরিমাণ</th>
              <th className="border-b-2 border-border-strong px-5 py-3">গন্তব্য</th>
              <th className="border-b-2 border-border-strong px-5 py-3">স্ট্যাটাস</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-border/60 transition-colors hover:bg-secondary/40 last:border-b-0">
                <td className="px-5 py-4 font-mono font-semibold text-primary">{r.id}</td>
                <td className="px-5 py-4 font-medium">{r.customer}</td>
                <td className="px-5 py-4">{r.driver}</td>
                <td className="px-5 py-4 font-mono text-xs text-muted-foreground">{r.truck}</td>
                <td className="px-5 py-4 font-bold">{r.qty}</td>
                <td className="px-5 py-4 text-muted-foreground">{r.location}</td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center rounded-full border-2 px-2.5 py-0.5 text-xs font-bold ${statusStyle[r.status]}`}>
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
