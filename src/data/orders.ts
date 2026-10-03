import { SERIALS } from "./serials";
import { getProductById } from "./products";
import type { Order } from "@/store/orders-store";
import { FALLBACK, QUOTE_KEYS, QUOTE_META } from "@/lib/rates/catalog";
import type { Quotes } from "@/lib/rates/types";
import { priceProduct } from "@/lib/pricing/engine";
import { DEFAULT_PRICING } from "@/lib/pricing/config";

/** Geçmiş siparişler için sabit (o günkü) kurlar */
const PAST_QUOTES = Object.fromEntries(
  QUOTE_KEYS.map((k) => {
    const { sourceKey, ...meta } = QUOTE_META[k];
    void sourceKey;
    return [k, { ...meta, buy: FALLBACK[k][0] * 0.985, sell: FALLBACK[k][1] * 0.985, change: 0 }];
  }),
) as Quotes;

const CITIES = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Konya", "Kayseri"];

/** Kayıt defterindeki satılmış seri numaralarından türetilen geçmiş siparişler (panel demosu) */
export const MOCK_ORDERS: (Order & { city: string })[] = (() => {
  const byOrder = new Map<string, typeof SERIALS>();
  for (const s of SERIALS) if (s.orderNo && s.status !== "stokta") byOrder.set(s.orderNo, [...(byOrder.get(s.orderNo) ?? []), s]);
  return [...byOrder.entries()]
    .slice(0, 18)
    .map(([no, list], i) => {
      const items = list.map((s) => {
        const p = getProductById(s.productId)!;
        const unit = priceProduct(p, PAST_QUOTES, DEFAULT_PRICING).total;
        return { productId: s.productId, qty: 1, unitPrice: unit, serials: [s.serial] };
      });
      const subtotal = items.reduce((a, b) => a + b.unitPrice, 0);
      const shipping = Math.round(149 + subtotal * 0.0015);
      return {
        no,
        createdAt: `${list[0].soldAt ?? "2026-09-28"}T1${i % 10}:2${i % 6}:00.000Z`,
        customer: list[0].owner ?? "M*** ***",
        items,
        subtotal,
        shipping,
        total: subtotal + shipping,
        shippingMethod: i % 4 === 0 ? "Mağazadan teslim" : "Sigortalı kargo",
        eInvoice: i % 5 === 0 ? "gib-iletildi" : "onaylandi",
        city: CITIES[i % CITIES.length],
      } as Order & { city: string };
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
})();
