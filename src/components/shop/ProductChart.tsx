"use client";
import { useState } from "react";
import type { Product } from "@/data/products";
import type { Range } from "@/lib/history";
import { QUOTE_META } from "@/lib/rates/catalog";
import { useQuote } from "@/store/hooks";
import { useHistory } from "@/components/charts/useHistory";
import { AreaChart } from "@/components/charts/AreaChart";
import { cx } from "@/lib/format";

const RANGES: Range[] = ["1G", "1H", "1A", "3A", "1Y"];

export function ProductChart({ p }: { p: Product }) {
  const [range, setRange] = useState<Range>("1A");
  const q = useQuote(p.quote);
  const data = useHistory(p.quote, range);
  const color = p.category === "gumus" ? "#c8ccd4" : "#d9b45a";
  return (
    <div className="rounded-card border border-line bg-surface p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-small text-ink-2">{QUOTE_META[p.quote].label} kuru</p>
        <div className="flex gap-1">
          {RANGES.map((r) => (
            <button key={r} onClick={() => setRange(r)} className={cx("num rounded-md px-2 py-1 text-caption", r === range ? "bg-surface-3 text-gold-hi" : "text-muted hover:text-ink")}>
              {r}
            </button>
          ))}
        </div>
      </div>
      <AreaChart data={data} live={q?.sell} height={220} color={color} />
    </div>
  );
}
