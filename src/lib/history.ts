import { hashStr, seeded } from "./random";

export interface Point {
  time: number; // unix saniye
  value: number;
}

export type Range = "1G" | "1H" | "1A" | "3A" | "1Y";

const RANGE_CFG: Record<Range, { points: number; step: number; vol: number }> = {
  "1G": { points: 96, step: 15 * 60, vol: 0.0012 },
  "1H": { points: 7 * 24, step: 3600, vol: 0.0028 },
  "1A": { points: 30, step: 86400, vol: 0.009 },
  "3A": { points: 90, step: 86400, vol: 0.009 },
  "1Y": { points: 52, step: 7 * 86400, vol: 0.02 },
};

/**
 * Geçmiş veri kaynağı olmadığı için: güncel fiyatta biten, tohumlu rastgele yürüyüş.
 * Aynı anahtar/aralık her zaman aynı şekli verir; son nokta = canlı fiyat.
 */
export function mockHistory(key: string, range: Range, current: number, trendPct = 0): Point[] {
  const { points, step, vol } = RANGE_CFG[range];
  const rnd = seeded(hashStr(key + range));
  const drift = trendPct / 100 / points;
  const values: number[] = [current];
  for (let i = 1; i < points; i++) {
    const prev = values[i - 1];
    const shock = (rnd() - 0.5) * 2 * vol;
    values.push(prev / (1 + drift + shock));
  }
  values.reverse();
  const now = Math.floor(Date.now() / 1000);
  const end = now - (now % step);
  return values.map((value, i) => ({ time: end - (points - 1 - i) * step, value }));
}
