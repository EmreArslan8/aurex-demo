"use client";
import { useState } from "react";
import type { QuoteKey } from "@/lib/rates/types";
import { QUOTE_META } from "@/lib/rates/catalog";
import { useQuote } from "@/store/hooks";
import { useRates } from "@/store/rates-store";
import { useHistory } from "@/components/charts/useHistory";
import { AreaChart } from "@/components/charts/AreaChart";
import { Change, LiveDot, Price } from "@/components/ui/Price";
import { cx, fmtTime } from "@/lib/format";

const TABS: QuoteKey[] = ["HAS", "GRA", "CEYREK", "GUMUS"];

function Row({ k }: { k: QuoteKey }) {
  const q = useQuote(k);
  return (
    <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 py-2.5 text-small">
      <span className="text-ink-2">{QUOTE_META[k].label}</span>
      <Price value={q?.buy} plain className="text-muted" />
      <Price value={q?.sell} plain className="w-24 text-right text-ink" />
    </div>
  );
}

/** Ana sayfa sağ panel: seçili kotasyonun canlı grafiği + alış/satış listesi */
export function HeroMarket() {
  const [k, setK] = useState<QuoteKey>("HAS");
  const q = useQuote(k);
  const data = useHistory(k, "1G");
  const fetchedAt = useRates((s) => s.snapshot?.sourceTime);

  return (
    <div className="rounded-[1.5rem] border border-line bg-surface/80 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div className="flex gap-1 rounded-xl bg-bg p-1">
          {TABS.map((t) => (
            <button key={t} onClick={() => setK(t)} className={cx("rounded-lg px-3 py-1.5 text-caption font-semibold uppercase transition", t === k ? "bg-surface-3 text-gold-hi" : "text-muted hover:text-ink")}>
              {QUOTE_META[t].short}
            </button>
          ))}
        </div>
        <span className="flex items-center gap-1.5 text-caption text-muted"><LiveDot /> Canlı</span>
      </div>
      <div className="mt-5 flex items-end justify-between">
        <div>
          <p className="text-small text-muted">{QUOTE_META[k].label} · satış</p>
          <Price value={q?.sell} className="text-price-lg font-medium" />
        </div>
        <Change value={q?.change} className="mb-1" />
      </div>
      <div className="-mx-2 mt-2">
        <AreaChart data={data} live={q?.sell} height={170} compact />
      </div>
      <div className="mt-2 border-t border-line pt-2">
        <div className="grid grid-cols-[1fr_auto_auto] gap-4 pb-1 text-caption uppercase text-muted">
          <span>Ürün</span><span>Alış</span><span className="w-24 text-right">Satış</span>
        </div>
        {(["GRA", "CEYREK", "CUMHURIYET", "GUMUS"] as QuoteKey[]).map((r) => <Row key={r} k={r} />)}
      </div>
      <p className="num mt-2 text-caption text-muted">Kaynak güncellemesi: {fetchedAt ? fmtTime(fetchedAt.replace(" ", "T")) : "—"}</p>
    </div>
  );
}
