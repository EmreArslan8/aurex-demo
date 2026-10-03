/** Demo kullanıcının geçmiş alımları (portföy). Bu tarayıcıda verilen siparişler de eklenir. */
export interface Holding {
  productId: string;
  qty: number;
  /** Alış birim fiyatı (₺) */
  cost: number;
  date: string;
}

export const DEMO_HOLDINGS: Holding[] = [
  { productId: "p04", qty: 2, cost: 58_420, date: "2026-06-12" },
  { productId: "p08", qty: 3, cost: 9_870, date: "2026-07-03" },
  { productId: "p01", qty: 5, cost: 6_910, date: "2026-09-18" },
  { productId: "p13", qty: 2, cost: 9_150, date: "2026-08-22" },
];
