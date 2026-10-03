import "server-only";
import { FALLBACK, QUOTE_KEYS, QUOTE_META } from "./catalog";
import type { Quotes, RatesSnapshot } from "./types";

const SOURCE_URL = "https://finans.truncgil.com/v4/today.json";
const TTL_MS = 30_000;

let cache: { at: number; data: RatesSnapshot } | null = null;

type RawItem = { Buying?: number; Selling?: number; Change?: number };

function build(raw: Record<string, RawItem> | null): Quotes {
  const out = {} as Quotes;
  for (const key of QUOTE_KEYS) {
    const meta = QUOTE_META[key];
    const item = raw?.[meta.sourceKey];
    const [fbBuy, fbSell] = FALLBACK[key];
    const sell = item?.Selling && item.Selling > 0 ? item.Selling : fbSell;
    const buy = item?.Buying && item.Buying > 0 ? item.Buying : Math.min(fbBuy, sell);
    out[key] = {
      key,
      label: meta.label,
      short: meta.short,
      unit: meta.unit,
      group: meta.group,
      buy,
      sell,
      change: item?.Change ?? 0,
    };
  }
  return out;
}

/** Truncgil'den güncel kurları çeker; 30 sn bellekte tutar, hata olursa son veriyi / yedeği döner. */
export async function getRates(): Promise<RatesSnapshot> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.data;
  try {
    const res = await fetch(SOURCE_URL, { cache: "no-store", signal: AbortSignal.timeout(6000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const raw = (await res.json()) as Record<string, RawItem> & { Update_Date?: string };
    const data: RatesSnapshot = {
      quotes: build(raw),
      sourceTime: raw.Update_Date ?? new Date().toISOString(),
      fetchedAt: new Date().toISOString(),
      source: "truncgil",
    };
    cache = { at: Date.now(), data };
    return data;
  } catch {
    if (cache) return cache.data;
    return {
      quotes: build(null),
      sourceTime: new Date().toISOString(),
      fetchedAt: new Date().toISOString(),
      source: "fallback",
    };
  }
}
