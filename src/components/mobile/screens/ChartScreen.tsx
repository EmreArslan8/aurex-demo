"use client";
import { useState } from "react";
import Link from "next/link";
import { BellPlus } from "lucide-react";
import type { QuoteKey } from "@/lib/rates/types";
import type { Range } from "@/lib/history";
import { QUOTE_META } from "@/lib/rates/catalog";
import { useQuote } from "@/store/hooks";
import { useHistory } from "@/components/charts/useHistory";
import { AreaChart } from "@/components/charts/AreaChart";
import { Change, Price } from "@/components/ui/Price";
import { cx } from "@/lib/format";

const RANGES: Range[] = ["1G", "1H", "1A", "3A", "1Y"];
const SHOP: Partial<Record<QuoteKey, string>> = { HAS: "/urunler?k=kulce", GRA: "/urunler?k=kulce", CEYREK: "/urun/ceyrek-altin", YARIM: "/urun/yarim-altin", CUMHURIYET: "/urun/cumhuriyet-altini", AYAR22: "/urunler?k=ziynet", GUMUS: "/urunler?k=gumus" };

export function ChartScreen({ k, onPick, onAlarm }: { k: QuoteKey; onPick: (k: QuoteKey) => void; onAlarm: () => void }) {
  const [range, setRange] = useState<Range>("1G");
  const q = useQuote(k);
  const data = useHistory(k, range);
  const color = k === "GUMUS" || k === "PLATIN" ? "#c8ccd4" : "#d9b45a";
  const spread = q ? q.sell - q.buy : null;

  return (
    <div className="px-4 pt-2">
      <select value={k} onChange={(e) => onPick(e.target.value as QuoteKey)} className="-ml-1 bg-transparent text-h3 outline-none">
        {(Object.keys(QUOTE_META) as QuoteKey[]).map((o) => <option key={o} value={o}>{QUOTE_META[o].label}</option>)}
      </select>
      <div className="mt-1 flex items-baseline gap-2">
        <Price value={q?.sell} className="text-h1 font-semibold" />
      </div>
      <Change value={q?.change} />
      <div className="-mx-2 mt-3">
        <AreaChart data={data} live={q?.sell} height={230} color={color} />
      </div>
      <div className="mt-2 flex justify-between rounded-xl bg-bg p-1">
        {RANGES.map((r) => (
          <button key={r} onClick={() => setRange(r)} className={cx("num flex-1 rounded-lg py-1.5 text-caption", r === range ? "bg-surface-3 text-gold-hi" : "text-muted")}>{r}</button>
        ))}
      </div>
      <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
        {[["Alış", q?.buy], ["Satış", q?.sell], ["Makas", spread]].map(([l, v]) => (
          <div key={l as string} className="rounded-xl bg-surface-2 p-2.5">
            <dt className="text-caption text-muted">{l}</dt>
            <dd><Price value={v as number | null} plain className="text-small font-semibold" /></dd>
          </div>
        ))}
      </dl>
      <div className="mt-4 grid grid-cols-2 gap-2 pb-4">
        <button onClick={onAlarm} className="flex h-11 items-center justify-center gap-2 rounded-xl border border-line-strong text-small"><BellPlus className="size-4" /> Alarm kur</button>
        {SHOP[k] ? <Link href={SHOP[k]!} className="grid h-11 place-items-center rounded-xl bg-gold text-small font-semibold text-bg">Satın al</Link> : <span />}
      </div>
    </div>
  );
}
