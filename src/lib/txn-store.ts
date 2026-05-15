import { useEffect, useState } from "react";

export type Txn = {
  id: string;
  kind: "income" | "expense";
  category: string;
  categoryLabel: string;
  amount: number;
  party: string;
  date: string; // YYYY-MM-DD
  note?: string;
};

const KEY = "bk_txns_v1";

const seed: Txn[] = [
  { id: "t1", kind: "income", category: "sale", categoryLabel: "ইট বিক্রয়", amount: 84500, party: "করিম ট্রেডার্স", date: today(0), note: "৫০০০ ইট" },
  { id: "t2", kind: "expense", category: "fuel", categoryLabel: "জ্বালানি / কয়লা", amount: 32000, party: "কয়লা সাপ্লায়ার", date: today(0), note: "৩ টন" },
  { id: "t3", kind: "expense", category: "wage", categoryLabel: "শ্রমিক মজুরি", amount: 18200, party: "দল ২", date: today(0) },
  { id: "t4", kind: "income", category: "advance", categoryLabel: "অগ্রিম পেমেন্ট", amount: 50000, party: "হাসান বিল্ডার্স", date: today(1) },
  { id: "t5", kind: "expense", category: "soil", categoryLabel: "মাটি ক্রয়", amount: 24000, party: "রহিম মিয়া", date: today(1), note: "১২ ট্রাক" },
  { id: "t6", kind: "expense", category: "truck", categoryLabel: "ট্রাক ভাড়া", amount: 5500, party: "ট্রাক চালক", date: today(2) },
];

function today(daysAgo: number) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

function read(): Txn[] {
  if (typeof window === "undefined") return seed;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw) as Txn[];
  } catch {
    return seed;
  }
}

function write(list: Txn[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new Event("txn-updated"));
}

export function useTxns(filter?: "income" | "expense") {
  const [list, setList] = useState<Txn[]>(seed);

  useEffect(() => {
    const sync = () => setList(read());
    sync();
    window.addEventListener("txn-updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("txn-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const all = filter ? list.filter((t) => t.kind === filter) : list;
  const sorted = [...all].sort((a, b) => (a.date < b.date ? 1 : -1));

  return {
    list: sorted,
    add: (t: Omit<Txn, "id">) => write([{ ...t, id: `t${Date.now()}` }, ...read()]),
    update: (id: string, patch: Partial<Txn>) =>
      write(read().map((x) => (x.id === id ? { ...x, ...patch } : x))),
    remove: (id: string) => write(read().filter((x) => x.id !== id)),
  };
}

export const bn = (n: number) =>
  n.toLocaleString("bn-BD", { maximumFractionDigits: 0 });
