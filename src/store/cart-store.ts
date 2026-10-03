"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartLine {
  productId: string;
  qty: number;
}

interface CartState {
  lines: CartLine[];
  open: boolean;
  add: (productId: string, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      open: false,
      add: (productId, qty = 1) =>
        set((s) => {
          const found = s.lines.find((l) => l.productId === productId);
          const lines = found
            ? s.lines.map((l) => (l.productId === productId ? { ...l, qty: l.qty + qty } : l))
            : [...s.lines, { productId, qty }];
          return { lines, open: true };
        }),
      setQty: (productId, qty) =>
        set((s) => ({ lines: s.lines.map((l) => (l.productId === productId ? { ...l, qty: Math.max(1, qty) } : l)) })),
      remove: (productId) => set((s) => ({ lines: s.lines.filter((l) => l.productId !== productId) })),
      clear: () => set({ lines: [] }),
      setOpen: (open) => set({ open }),
    }),
    { name: "aurex-cart", partialize: (s) => ({ lines: s.lines }) },
  ),
);
