"use client";
import { useMemo } from "react";
import type { Product } from "@/data/products";
import { getProductById } from "@/data/products";
import type { QuoteKey } from "@/lib/rates/types";
import { priceProduct, shippingCost } from "@/lib/pricing/engine";
import { useCart } from "./cart-store";
import { usePricing } from "./pricing-store";
import { useRates } from "./rates-store";

export function useQuote(key: QuoteKey) {
  return useRates((s) => s.quotes?.[key] ?? null);
}

/** Bir önceki tike göre yön: 1 yukarı, -1 aşağı, 0 sabit */
export function useTickDir(key: QuoteKey) {
  return useRates((s) => {
    const a = s.prev?.[key]?.sell;
    const b = s.quotes?.[key]?.sell;
    if (a == null || b == null || a === b) return 0;
    return b > a ? 1 : -1;
  });
}

/** Ürünün canlı fiyatı (kur + panelden gelen kurallarla) */
export function usePrice(p: Product) {
  const quotes = useRates((s) => s.quotes);
  const cfg = usePricing((s) => s.config);
  return useMemo(() => (quotes ? priceProduct(p, quotes, cfg) : null), [p, quotes, cfg]);
}

export function useCartSummary(insured = true) {
  const lines = useCart((s) => s.lines);
  const quotes = useRates((s) => s.quotes);
  const cfg = usePricing((s) => s.config);
  return useMemo(() => {
    const items = lines
      .map((l) => {
        const product = getProductById(l.productId);
        if (!product) return null;
        const unit = quotes ? priceProduct(product, quotes, cfg).total : 0;
        return { ...l, product, unit, total: unit * l.qty };
      })
      .filter((x) => x !== null);
    const subtotal = items.reduce((a, b) => a + b.total, 0);
    const shipping = shippingCost(subtotal, cfg, insured);
    const count = items.reduce((a, b) => a + b.qty, 0);
    return { items, subtotal, shipping, total: subtotal + shipping, count, ready: !!quotes };
  }, [lines, quotes, cfg, insured]);
}
