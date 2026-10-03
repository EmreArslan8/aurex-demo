"use client";
import { useMemo } from "react";
import { mockHistory, type Range } from "@/lib/history";
import type { QuoteKey } from "@/lib/rates/types";
import { useRates } from "@/store/rates-store";

/** Grafik verisi: baz kur değişince yeniden üretilir, saniyelik tik son noktaya ayrıca işlenir. */
export function useHistory(key: QuoteKey, range: Range) {
  const base = useRates((s) => s.snapshot?.quotes[key] ?? null);
  return useMemo(() => (base ? mockHistory(key, range, base.sell, base.change * (range === "1G" ? 1 : 4)) : []), [key, range, base]);
}
