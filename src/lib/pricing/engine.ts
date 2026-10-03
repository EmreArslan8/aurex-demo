import type { Product } from "@/data/products";
import type { Quotes } from "@/lib/rates/types";
import type { PricingConfig } from "./config";

export interface PriceBreakdown {
  /** Piyasa değeri (kotasyon × miktar) */
  metal: number;
  premium: number;
  margin: number;
  vat: number;
  /** Müşterinin ödeyeceği birim fiyat */
  total: number;
  /** Aurex'in geri alım (bozdurma) fiyatı */
  buyback: number;
  change: number;
}

const round2 = (v: number) => Math.round(v * 100) / 100;

/** Tek fiyat formülü: (kur × miktar) + üretim primi + marj + KDV. */
export function priceProduct(p: Product, quotes: Quotes, cfg: PricingConfig): PriceBreakdown {
  const q = quotes[p.quote];
  const metal = q.sell * p.amount;
  const premium = metal * p.premium;
  const margin = (metal + premium) * cfg.margin[p.category];
  const vat = (metal + premium + margin) * cfg.vat[p.category];
  const buyback = q.buy * p.amount * (1 - cfg.buybackSpread);
  return {
    metal: round2(metal),
    premium: round2(premium),
    margin: round2(margin),
    vat: round2(vat),
    total: round2(metal + premium + margin + vat),
    buyback: round2(buyback),
    change: q.change,
  };
}

export function shippingCost(subtotal: number, cfg: PricingConfig, insured: boolean) {
  if (subtotal <= 0) return 0;
  return round2(cfg.shippingBase + (insured ? subtotal * cfg.insuranceRate : 0));
}
