"use client";
import { create } from "zustand";
import { QUOTE_KEYS } from "@/lib/rates/catalog";
import type { Quotes, RatesSnapshot } from "@/lib/rates/types";

/** Saniyelik ara değerlerin baz kurdan en fazla sapma oranı */
const MAX_DRIFT = 0.0009;
const STEP = 0.00022;

interface RatesState {
  snapshot: RatesSnapshot | null;
  /** Ekranda gösterilen (saniyelik akan) kotasyonlar */
  quotes: Quotes | null;
  /** Bir önceki tik — fiyat yanıp sönme yönü için */
  prev: Quotes | null;
  drift: Record<string, number>;
  status: "loading" | "live" | "error";
  tickAt: number;
  setSnapshot: (s: RatesSnapshot) => void;
  tick: () => void;
  fail: () => void;
}

export const useRates = create<RatesState>((set, get) => ({
  snapshot: null,
  quotes: null,
  prev: null,
  drift: {},
  status: "loading",
  tickAt: 0,
  setSnapshot: (snapshot) => {
    const { drift } = get();
    set({ snapshot, status: snapshot.source === "truncgil" ? "live" : "error", quotes: applyDrift(snapshot.quotes, drift), tickAt: Date.now() });
  },
  tick: () => {
    const { snapshot, quotes, drift } = get();
    if (!snapshot) return;
    const next: Record<string, number> = {};
    for (const k of QUOTE_KEYS) {
      const d = (drift[k] ?? 0) + (Math.random() - 0.5) * 2 * STEP;
      next[k] = Math.max(-MAX_DRIFT, Math.min(MAX_DRIFT, d * 0.96));
    }
    set({ drift: next, prev: quotes, quotes: applyDrift(snapshot.quotes, next), tickAt: Date.now() });
  },
  fail: () => set({ status: "error" }),
}));

function applyDrift(base: Quotes, drift: Record<string, number>): Quotes {
  const out = {} as Quotes;
  for (const k of QUOTE_KEYS) {
    const f = 1 + (drift[k] ?? 0);
    const q = base[k];
    out[k] = { ...q, buy: q.buy * f, sell: q.sell * f };
  }
  return out;
}
