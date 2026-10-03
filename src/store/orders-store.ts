"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface OrderItem {
  productId: string;
  qty: number;
  unitPrice: number;
  serials: string[];
}

export interface Order {
  no: string;
  createdAt: string;
  customer: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingMethod: string;
  eInvoice: "kuyrukta" | "gib-iletildi" | "onaylandi";
}

interface OrdersState {
  orders: Order[];
  add: (o: Order) => void;
  nextSeq: number;
  takeSeq: (n: number) => number;
}

/** Demo'da verilen siparişler (bu tarayıcıda saklanır) — doğrulama, portföy ve panelde görünür. */
export const useOrders = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],
      nextSeq: 70000,
      add: (o) => set((s) => ({ orders: [o, ...s.orders] })),
      takeSeq: (n) => {
        const start = get().nextSeq;
        set({ nextSeq: start + n });
        return start;
      },
    }),
    { name: "aurex-orders" },
  ),
);
