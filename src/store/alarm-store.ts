"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { QuoteKey } from "@/lib/rates/types";

export interface PriceAlarm {
  id: string;
  key: QuoteKey;
  dir: "above" | "below";
  target: number;
  createdAt: number;
  firedAt?: number;
}

interface AlarmState {
  alarms: PriceAlarm[];
  add: (a: Omit<PriceAlarm, "id" | "createdAt">) => void;
  remove: (id: string) => void;
  fire: (id: string) => void;
}

export const useAlarms = create<AlarmState>()(
  persist(
    (set) => ({
      alarms: [],
      add: (a) => set((s) => ({ alarms: [{ ...a, id: crypto.randomUUID(), createdAt: Date.now() }, ...s.alarms] })),
      remove: (id) => set((s) => ({ alarms: s.alarms.filter((x) => x.id !== id) })),
      fire: (id) => set((s) => ({ alarms: s.alarms.map((x) => (x.id === id ? { ...x, firedAt: Date.now() } : x)) })),
    }),
    { name: "aurex-alarms" },
  ),
);
