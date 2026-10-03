"use client";
import type { QuoteKey } from "@/lib/rates/types";
import { QUOTE_KEYS, QUOTE_META } from "@/lib/rates/catalog";
import { useRates } from "@/store/rates-store";
import { useHistory } from "@/components/charts/useHistory";
import { Sparkline } from "@/components/charts/Sparkline";
import { Change, Price } from "@/components/ui/Price";
import { cx } from "@/lib/format";

function Spark({ k, up }: { k: QuoteKey; up: boolean }) {
  const data = useHistory(k, "1G");
  return <Sparkline data={data} up={up} />;
}

export function MarketTable({ selected, onSelect }: { selected: QuoteKey; onSelect: (k: QuoteKey) => void }) {
  const quotes = useRates((s) => s.quotes);
  return (
    <div className="overflow-hidden rounded-card border border-line bg-surface">
      <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-line px-4 py-3 text-caption uppercase text-muted md:grid-cols-[1.4fr_1fr_1fr_auto_auto]">
        <span>Varlık</span>
        <span className="hidden text-right md:block">Alış</span>
        <span className="text-right">Satış</span>
        <span className="hidden md:block">Gün</span>
        <span className="text-right">Değişim</span>
      </div>
      {QUOTE_KEYS.map((k) => {
        const q = quotes?.[k];
        const m = QUOTE_META[k];
        return (
          <button
            key={k}
            onClick={() => onSelect(k)}
            className={cx(
              "grid w-full grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-line px-4 py-3 text-left transition last:border-0 md:grid-cols-[1.4fr_1fr_1fr_auto_auto]",
              selected === k ? "bg-gold/[0.06]" : "hover:bg-surface-2",
            )}
          >
            <span className="min-w-0">
              <span className={cx("block truncate font-semibold", selected === k && "text-gold-hi")}>{m.label}</span>
              <span className="text-caption text-muted">{m.unit === "adet" ? "adet" : m.unit === "gram" ? "gram" : "TL"}</span>
            </span>
            <Price value={q?.buy} plain className="hidden text-right text-ink-2 md:block" />
            <Price value={q?.sell} plain className="text-right font-semibold" />
            <span className="hidden md:block">{q && <Spark k={k} up={q.change >= 0} />}</span>
            <Change value={q?.change} className="w-16 text-right" />
          </button>
        );
      })}
    </div>
  );
}
