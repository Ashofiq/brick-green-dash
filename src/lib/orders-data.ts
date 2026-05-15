export type OrderStatus = "নতুন" | "চলমান" | "সম্পন্ন" | "বাতিল";

export type Order = {
  id: string;
  customer: string;
  phone: string;
  address: string;
  brickType: string;
  qty: number;
  unitPrice: number;
  advance: number;
  deliveryDate: string;
  orderDate: string;
  status: OrderStatus;
  note?: string;
};

export const orders: Order[] = [
  {
    id: "ORD-124",
    customer: "করিম ট্রেডার্স",
    phone: "০১৭১১-১২৩৪৫৬",
    address: "বাজার রোড, সাভার, ঢাকা",
    brickType: "১ নম্বর ইট",
    qty: 10000,
    unitPrice: 8.5,
    advance: 25000,
    deliveryDate: "২০ মে ২০২৬",
    orderDate: "১৫ মে ২০২৬",
    status: "নতুন",
    note: "সকাল ৮টার মধ্যে ডেলিভারি দিতে হবে",
  },
  {
    id: "ORD-123",
    customer: "হাসান বিল্ডার্স",
    phone: "০১৮২২-৬৫৪৩২১",
    address: "নতুনপাড়া, কেরানীগঞ্জ",
    brickType: "১ নম্বর ইট",
    qty: 25000,
    unitPrice: 8.5,
    advance: 100000,
    deliveryDate: "১৮ মে ২০২৬",
    orderDate: "১৪ মে ২০২৬",
    status: "চলমান",
  },
  {
    id: "ORD-122",
    customer: "নুরুল কনস্ট্রাকশন",
    phone: "০১৯৩৩-৭৭৭৭৭৭",
    address: "উত্তরা, ঢাকা",
    brickType: "পিকেট ইট",
    qty: 15000,
    unitPrice: 10,
    advance: 150000,
    deliveryDate: "১২ মে ২০২৬",
    orderDate: "১০ মে ২০২৬",
    status: "সম্পন্ন",
  },
  {
    id: "ORD-121",
    customer: "আলম এন্টারপ্রাইজ",
    phone: "০১৬৫৫-৪৪৪৪৪৪",
    address: "মিরপুর-১০, ঢাকা",
    brickType: "২ নম্বর ইট",
    qty: 8000,
    unitPrice: 7,
    advance: 56000,
    deliveryDate: "০৮ মে ২০২৬",
    orderDate: "০৬ মে ২০২৬",
    status: "সম্পন্ন",
  },
];

export function getOrderById(id: string) {
  return orders.find((o) => o.id === id);
}

const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
export const toBn = (n: number | string) =>
  String(n).replace(/\d/g, (d) => bnDigits[Number(d)]);
export const bnNum = (n: number) => toBn(n.toLocaleString("en-IN"));
export const bnMoney = (n: number) => `৳ ${bnNum(Math.round(n))}`;

export const statusTone = (s: OrderStatus): "success" | "warning" | "danger" => {
  if (s === "সম্পন্ন") return "success";
  if (s === "বাতিল") return "danger";
  return "warning";
};
