"use client";
import { useState } from "react";
import type { QuoteKey } from "@/lib/rates/types";
import type { Range } from "@/lib/history";
import { QUOTE_META } from "@/lib/rates/catalog";
import { useQuote } from "@/store/hooks";
import { useHistory } from "@/components/charts/useHistory";
import { AreaChart } from "@/components/charts/AreaChart";
import { Change, LiveDot, Price } from "@/components/ui/Price";
import { MarketTable } from "./MarketTable";
import { Converter } from "./Converter";
import { cx } from "@/lib/format";

const RANGES: Range[] = ["1G", "1H", "1A", "3A", "1Y"];

export function MarketsView() {
  const [k, setK] = useState<QuoteKey>("HAS");
  const [range, setRange] = useState<Range>("1G");
  const q = useQuote(k);
  const data = useHistory(k, range);
  const color = k === "GUMUS" || k === "PLATIN" ? "#c8ccd4" : "#d9b45a";

  return (
    <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
      <div className="space-y-5">
        <div className="rounded-card border border-line bg-surface p-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="flex items-center gap-2 text-small text-muted"><LiveDot /> {QUOTE_META[k].label}</p>
              <div className="mt-1 flex items-baseline gap-3">
                <Price value={q?.sell} className="text-price-lg font-semibold" />
                <Change value={q?.change} />
              </div>
              <p className="mt-1 text-small text-muted">Alış <Price value={q?.buy} plain className="text-ink-2" /></p>
            </div>
            <div className="flex gap-1 rounded-xl bg-bg p-1">
              {RANGES.map((r) => (
                <button key={r} onClick={() => setRange(r)} className={cx("num rounded-lg px-2.5 py-1.5 text-caption", r === range ? "bg-surface-3 text-gold-hi" : "text-muted hover:text-ink")}>
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <AreaChart data={data} live={q?.sell} height={300} color={color} />
          </div>
        </div>
        <MarketTable selected={k} onSelect={setK} />
      </div>
      <div className="space-y-5 lg:sticky lg:top-24 lg:self-start">
        <Converter />
      </div>
    </div>
  );
}
