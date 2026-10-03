import type { Quote, QuoteKey } from "./types";

type Meta = Omit<Quote, "buy" | "sell" | "change"> & { sourceKey: string };

/** Uygulama kotasyonu ↔ kaynak (Truncgil) anahtar eşlemesi. Tek merkez. */
export const QUOTE_META: Record<QuoteKey, Meta> = {
  HAS: { key: "HAS", sourceKey: "HAS", label: "Has Altın", short: "HAS", unit: "gram", group: "altin" },
  GRA: { key: "GRA", sourceKey: "GRA", label: "Gram Altın", short: "GRAM", unit: "gram", group: "altin" },
  CEYREK: { key: "CEYREK", sourceKey: "CEYREKALTIN", label: "Çeyrek Altın", short: "ÇEYREK", unit: "adet", group: "altin" },
  YARIM: { key: "YARIM", sourceKey: "YARIMALTIN", label: "Yarım Altın", short: "YARIM", unit: "adet", group: "altin" },
  TAM: { key: "TAM", sourceKey: "TAMALTIN", label: "Tam Altın", short: "TAM", unit: "adet", group: "altin" },
  CUMHURIYET: { key: "CUMHURIYET", sourceKey: "CUMHURIYETALTINI", label: "Cumhuriyet Altını", short: "CUMH.", unit: "adet", group: "altin" },
  AYAR22: { key: "AYAR22", sourceKey: "YIA", label: "22 Ayar Bilezik", short: "22K", unit: "gram", group: "altin" },
  GUMUS: { key: "GUMUS", sourceKey: "GUMUS", label: "Gram Gümüş", short: "GÜMÜŞ", unit: "gram", group: "gumus" },
  PLATIN: { key: "PLATIN", sourceKey: "GPL", label: "Gram Platin", short: "PLATİN", unit: "gram", group: "diger" },
  USD: { key: "USD", sourceKey: "USD", label: "Amerikan Doları", short: "USD", unit: "TL", group: "doviz" },
  EUR: { key: "EUR", sourceKey: "EUR", label: "Euro", short: "EUR", unit: "TL", group: "doviz" },
};

export const QUOTE_KEYS = Object.keys(QUOTE_META) as QuoteKey[];

/** Kaynağa ulaşılamazsa kullanılan yaklaşık değerler (Ekim 2026). */
export const FALLBACK: Record<QuoteKey, [buy: number, sell: number]> = {
  HAS: [6509, 6510],
  GRA: [6542, 6543],
  CEYREK: [10600, 10850],
  YARIM: [21134, 21700],
  TAM: [42400, 43268],
  CUMHURIYET: [43965, 44619],
  AYAR22: [6042, 6052],
  GUMUS: [95.35, 95.4],
  PLATIN: [2683, 2692],
  USD: [49.07, 49.18],
  EUR: [55.24, 55.4],
};
