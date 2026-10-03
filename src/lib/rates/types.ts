/** Piyasa kotasyonlarının uygulama içi kimlikleri. */
export type QuoteKey =
  | "HAS" // 24 ayar has altın (gram)
  | "GRA" // gram altın
  | "CEYREK"
  | "YARIM"
  | "TAM"
  | "CUMHURIYET"
  | "AYAR22" // 22 ayar bilezik (gram)
  | "GUMUS" // gram gümüş
  | "PLATIN" // gram platin
  | "USD"
  | "EUR";

export interface Quote {
  key: QuoteKey;
  label: string;
  short: string;
  /** Piyasa alış (dealer'ın aldığı) */
  buy: number;
  /** Piyasa satış (dealer'ın sattığı) */
  sell: number;
  /** Günlük değişim % */
  change: number;
  unit: "gram" | "adet" | "TL";
  group: "altin" | "gumus" | "doviz" | "diger";
}

export type Quotes = Record<QuoteKey, Quote>;

export interface RatesSnapshot {
  quotes: Quotes;
  /** Kaynağın kendi güncelleme zamanı (ISO) */
  sourceTime: string;
  fetchedAt: string;
  source: "truncgil" | "fallback";
}
