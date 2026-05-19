import { useEffect, useState } from "react";

export type Sale = {
  id: string;
  date: string; // ISO
  customer: string;
  phone?: string;
  brickType: string;
  qty: number;
  unitPrice: number;
  total: number;
  paid: number;
  due: number;
  paymentMode: "নগদ" | "বাকি" | "চেক" | "বিকাশ";
  note?: string;
};

const KEY = "brick_sales_v1";

function read(): Sale[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function write(list: Sale[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new Event("sales:changed"));
}

export function useSales() {
  const [list, setList] = useState<Sale[]>([]);
  useEffect(() => {
    setList(read());
    const h = () => setList(read());
    window.addEventListener("sales:changed", h);
    return () => window.removeEventListener("sales:changed", h);
  }, []);
  return {
    sales: list,
    add: (s: Omit<Sale, "id">) => {
      const id = `SAL-${Date.now().toString().slice(-6)}`;
      write([{ ...s, id }, ...read()]);
    },
    remove: (id: string) => write(read().filter((x) => x.id !== id)),
  };
}
