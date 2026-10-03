"use client";
import type { QuoteKey } from "@/lib/rates/types";
import { QUOTE_KEYS, QUOTE_META } from "@/lib/rates/catalog";
import { useRates } from "@/store/rates-store";
import { useHistory } from "@/components/charts/useHistory";
import { Sparkline } from "@/components/charts/Sparkline";
import { Change, Price } from "@/components/ui/Price";
import { usePortfolio } from "../usePortfolio";
import { fmtTL } from "@/lib/format";

function Row({ k, onOpen }: { k: QuoteKey; onOpen: (k: QuoteKey) => void }) {
  const q = useRates((s) => s.quotes?.[k]);
  const data = useHistory(k, "1G");
  return (
    <button onClick={() => onOpen(k)} className="flex w-full items-center gap-3 border-b border-line/70 px-4 py-3 text-left active:bg-surface-2">
      <div className="min-w-0 flex-1">
        <p className="truncate text-small font-semibold">{QUOTE_META[k].label}</p>
        <p className="text-caption text-muted">Alış <Price value={q?.buy} plain className="text-muted" /></p>
      </div>
      {q && <Sparkline data={data} up={q.change >= 0} width={56} height={22} />}
      <div className="w-24 text-right">
        <Price value={q?.sell} plain className="block text-small font-semibold" />
        <Change value={q?.change} className="text-caption" />
      </div>
    </button>
  );
}

const greeting = () => {
  const h = new Date().getHours();
  return h < 6 ? "İyi geceler," : h < 12 ? "Günaydın," : h < 18 ? "İyi günler," : "İyi akşamlar,";
};

export function MarketScreen({ onOpen }: { onOpen: (k: QuoteKey) => void }) {
  const pf = usePortfolio();
  return (
    <div>
      <div className="px-4 pt-2 pb-4">
        <p className="text-small text-muted">{greeting()}</p>
        <p className="text-h3">Demo Kullanıcı</p>
        <div className="mt-3 rounded-2xl bg-gradient-to-br from-gold/25 via-gold/10 to-transparent p-4 ring-1 ring-gold/30">
          <p className="text-caption uppercase text-gold-hi">Portföy değeri</p>
          <p className="num mt-1 text-h2">{pf.ready ? fmtTL(pf.value) : "—"}</p>
          <p className={`num text-small ${pf.pnl >= 0 ? "text-up" : "text-down"}`}>
            {pf.pnl >= 0 ? "+" : "−"}{fmtTL(Math.abs(pf.pnl))} ({pf.pnlPct >= 0 ? "+" : "−"}%{Math.abs(pf.pnlPct).toFixed(2).replace(".", ",")})
          </p>
        </div>
      </div>
      <p className="px-4 pb-1 text-caption uppercase text-muted">Canlı piyasa</p>
      {QUOTE_KEYS.map((k) => <Row key={k} k={k} onOpen={onOpen} />)}
    </div>
  );
}
