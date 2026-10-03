"use client";
import { useMemo } from "react";
import { MOCK_ORDERS } from "@/data/orders";
import { PRODUCTS } from "@/data/products";
import { SERIALS, type SerialRecord } from "@/data/serials";
import { priceProduct } from "@/lib/pricing/engine";
import { useOrders } from "@/store/orders-store";
import { usePricing } from "@/store/pricing-store";
import { useRates } from "@/store/rates-store";

/** Panel için birleşik veri: kayıt defteri + bu tarayıcıdaki demo siparişleri */
export function usePanelOrders() {
  const live = useOrders((s) => s.orders);
  return useMemo(() => [...live.map((o) => ({ ...o, city: "İstanbul", live: true })), ...MOCK_ORDERS.map((o) => ({ ...o, live: false }))], [live]);
}

export function usePanelSerials(): SerialRecord[] {
  const orders = useOrders((s) => s.orders);
  return useMemo(() => {
    const fromOrders: SerialRecord[] = orders.flatMap((o) =>
      o.items.flatMap((it) =>
        it.serials.map((serial) => ({
          serial,
          productId: it.productId,
          lot: `L${serial.split("-").slice(1, 3).join("-")}`,
          certificateNo: `CRT-${serial.replace(/\D/g, "").slice(-7)}`,
          producedAt: o.createdAt.slice(0, 10),
          assayer: "Dr. S. Yalın",
          status: "satildi" as const,
          soldAt: o.createdAt.slice(0, 10),
          owner: o.customer,
          orderNo: o.no,
        })),
      ),
    );
    return [...fromOrders, ...SERIALS];
  }, [orders]);
}

export function useStockValuation() {
  const quotes = useRates((s) => s.quotes);
  const cfg = usePricing((s) => s.config);
  return useMemo(
    () =>
      PRODUCTS.map((p) => {
        const pr = quotes ? priceProduct(p, quotes, cfg) : null;
        return { p, price: pr?.total ?? 0, buyback: pr?.buyback ?? 0, value: (pr?.metal ?? 0) * p.stock, ready: !!pr };
      }),
    [quotes, cfg],
  );
}
