import type { Category } from "@/data/products";

/** Tüm fiyat kuralları tek yerde. Yönetim panelinden değiştirilir, mağaza anında yansıtır. */
export interface PricingConfig {
  /** Kategori bazlı kâr marjı (oran) */
  margin: Record<Category, number>;
  /** Kategori bazlı KDV (oran) — yatırımlık altın istisna, gümüş %20 */
  vat: Record<Category, number>;
  /** Geri alım (bozdurma) fiyatında piyasa alışından düşülen makas */
  buybackSpread: number;
  /** Sigortalı kargo: sepet değerinin oranı + taban ücret */
  insuranceRate: number;
  shippingBase: number;
  /** Ödeme adımında fiyatın sabit tutulduğu süre (sn) */
  priceLockSeconds: number;
}

export const DEFAULT_PRICING: PricingConfig = {
  margin: { kulce: 0.006, sikke: 0.01, ziynet: 0.02, gumus: 0.03 },
  vat: { kulce: 0, sikke: 0, ziynet: 0, gumus: 0.2 },
  buybackSpread: 0.004,
  insuranceRate: 0.0015,
  shippingBase: 149,
  priceLockSeconds: 90,
};
