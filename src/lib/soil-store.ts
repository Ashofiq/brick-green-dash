import { useEffect, useState } from "react";

export type SoilKind = "সংগ্রহ" | "ব্যবহার";

export type SoilEntry = {
  id: string;
  date: string; // ISO yyyy-mm-dd
  kind: SoilKind; // সংগ্রহ = stock in, ব্যবহার = stock out
  source: string; // for সংগ্রহ: supplier; for ব্যবহার: purpose/batch
  trucks: number;
  pricePerTruck: number; // 0 for ব্যবহার
  total: number;
  paid: number;
  due: number;
  status: "পরিশোধিত" | "আংশিক" | "বাকি" | "ব্যবহৃত";
  note?: string;
};

const KEY = "soil_entries_v2";

const seed: SoilEntry[] = [
  { id: "SOIL-0001", date: "2026-05-15", kind: "সংগ্রহ", source: "জমির মালিক — কাশেম", trucks: 12, pricePerTruck: 2000, total: 24000, paid: 24000, due: 0, status: "পরিশোধিত" },
  { id: "SOIL-0002", date: "2026-05-14", kind: "সংগ্রহ", source: "মাঝিপাড়া খনি", trucks: 8, pricePerTruck: 2000, total: 16000, paid: 0, due: 16000, status: "বাকি" },
  { id: "SOIL-0003", date: "2026-05-13", kind: "সংগ্রহ", source: "জমির মালিক — হাবিব", trucks: 15, pricePerTruck: 2000, total: 30000, paid: 30000, due: 0, status: "পরিশোধিত" },
  { id: "SOIL-0004", date: "2026-05-16", kind: "ব্যবহার", source: "উৎপাদন ব্যাচ #১২ — কাঁচা ইট তৈরি", trucks: 6, pricePerTruck: 0, total: 0, paid: 0, due: 0, status: "ব্যবহৃত" },
];

function read(): SoilEntry[] {
  if (typeof window === "undefined") return seed;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw);
  } catch {
    return seed;
  }
}

function write(items: SoilEntry[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("soil:changed"));
}

export function useSoil() {
  const [items, setItems] = useState<SoilEntry[]>(() => read());

  useEffect(() => {
    const handler = () => setItems(read());
    window.addEventListener("soil:changed", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("soil:changed", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const add = (e: Omit<SoilEntry, "id">) => {
    const list = read();
    const id = `SOIL-${String(list.length + 1).padStart(4, "0")}`;
    write([{ ...e, id }, ...list]);
  };

  const update = (id: string, patch: Partial<SoilEntry>) => {
    write(read().map((x) => (x.id === id ? { ...x, ...patch } : x)));
  };

  const remove = (id: string) => write(read().filter((x) => x.id !== id));

  return { items, add, update, remove };
}

export function statusFor(total: number, paid: number): SoilEntry["status"] {
  if (paid >= total && total > 0) return "পরিশোধিত";
  if (paid <= 0) return "বাকি";
  return "আংশিক";
}

export function soilStock(items: SoilEntry[]) {
  const inTrucks = items.filter((x) => x.kind === "সংগ্রহ").reduce((s, x) => s + x.trucks, 0);
  const outTrucks = items.filter((x) => x.kind === "ব্যবহার").reduce((s, x) => s + x.trucks, 0);
  return { inTrucks, outTrucks, stock: inTrucks - outTrucks };
}
