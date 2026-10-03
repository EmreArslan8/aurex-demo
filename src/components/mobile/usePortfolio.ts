"use client";
import { useMemo } from "react";
import { DEMO_HOLDINGS } from "@/data/portfolio";
import { getProductById } from "@/data/products";
import { priceProduct } from "@/lib/pricing/engine";
import { useOrders } from "@/store/orders-store";
import { usePricing } from "@/store/pricing-store";
import { useRates } from "@/store/rates-store";

/** Portföy: kalemlerin güncel değeri = geri alım (bozdurma) fiyatı × adet */
export function usePortfolio() {
  const orders = useOrders((s) => s.orders);
  const quotes = useRates((s) => s.quotes);
  const cfg = usePricing((s) => s.config);

  return useMemo(() => {
    const fromOrders = orders.flatMap((o) => o.items.map((i) => ({ productId: i.productId, qty: i.qty, cost: i.unitPrice, date: o.createdAt.slice(0, 10) })));
    const rows = [...fromOrders, ...DEMO_HOLDINGS].map((h) => {
      const p = getProductById(h.productId)!;
      const value = quotes ? priceProduct(p, quotes, cfg).buyback * h.qty : 0;
      const cost = h.cost * h.qty;
      return { ...h, p, value, costTotal: cost, pnl: value - cost, pnlPct: cost ? ((value - cost) / cost) * 100 : 0 };
    });
    const value = rows.reduce((a, r) => a + r.value, 0);
    const cost = rows.reduce((a, r) => a + r.costTotal, 0);
    return { rows, value, cost, pnl: value - cost, pnlPct: cost ? ((value - cost) / cost) * 100 : 0, ready: !!quotes };
  }, [orders, quotes, cfg]);
}
