"use client";
import Image from "next/image";
import { usePortfolio } from "../usePortfolio";
import { fmtDate, fmtTL } from "@/lib/format";
import { cx } from "@/lib/format";

const sign = (v: number) => (v >= 0 ? "+" : "−");

export function PortfolioScreen() {
  const pf = usePortfolio();
  const gold = pf.rows.filter((r) => r.p.category !== "gumus").reduce((a, r) => a + r.value, 0);
  const goldPct = pf.value ? (gold / pf.value) * 100 : 0;

  return (
    <div className="px-4 pt-2 pb-4">
      <p className="text-h3">Portföyüm</p>
      <div className="mt-3 rounded-2xl bg-surface-2 p-4">
        <p className="text-caption uppercase text-muted">Toplam değer (bugün bozdurursanız)</p>
        <p className="num mt-1 text-h1">{pf.ready ? fmtTL(pf.value) : "—"}</p>
        <div className="mt-3 grid grid-cols-2 gap-3 text-small">
          <div>
            <p className="text-caption text-muted">Maliyet</p>
            <p className="num">{fmtTL(pf.cost)}</p>
          </div>
          <div>
            <p className="text-caption text-muted">Kâr / zarar</p>
            <p className={cx("num font-semibold", pf.pnl >= 0 ? "text-up" : "text-down")}>
              {sign(pf.pnl)}{fmtTL(Math.abs(pf.pnl))}
            </p>
          </div>
        </div>
        <div className="mt-4 flex h-2 overflow-hidden rounded-full bg-silver/60">
          <div className="bg-gold" style={{ width: `${goldPct}%` }} />
        </div>
        <div className="mt-1.5 flex justify-between text-caption text-muted">
          <span>Altın %{goldPct.toFixed(0)}</span>
          <span>Gümüş %{(100 - goldPct).toFixed(0)}</span>
        </div>
      </div>
      <p className="mt-5 mb-2 text-caption uppercase text-muted">Varlıklarım</p>
      <div className="space-y-2">
        {pf.rows.map((r, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl bg-surface-2 p-3">
            <div className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-bg">
              <Image src={r.p.image} alt="" fill sizes="44px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-small font-semibold">{r.qty} × {r.p.name}</p>
              <p className="text-caption text-muted">{fmtDate(r.date)}</p>
            </div>
            <div className="text-right">
              <p className="num text-small">{fmtTL(r.value)}</p>
              <p className={cx("num text-caption", r.pnl >= 0 ? "text-up" : "text-down")}>
                {sign(r.pnlPct)}%{Math.abs(r.pnlPct).toFixed(2).replace(".", ",")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
