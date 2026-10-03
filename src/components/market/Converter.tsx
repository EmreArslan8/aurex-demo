"use client";
import { useState } from "react";
import { ArrowDownUp } from "lucide-react";
import type { QuoteKey } from "@/lib/rates/types";
import { QUOTE_META } from "@/lib/rates/catalog";
import { useQuote } from "@/store/hooks";
import { fmtNum, fmtTL } from "@/lib/format";

const OPTIONS: QuoteKey[] = ["GRA", "HAS", "CEYREK", "CUMHURIYET", "GUMUS", "USD", "EUR"];

/** TL ↔ altın hesaplayıcı */
export function Converter() {
  const [key, setKey] = useState<QuoteKey>("GRA");
  const [tl, setTl] = useState(10000);
  const [reverse, setReverse] = useState(false);
  const q = useQuote(key);
  const unit = QUOTE_META[key].unit === "adet" ? "adet" : QUOTE_META[key].unit === "gram" ? "gram" : QUOTE_META[key].short;
  const result = q ? (reverse ? tl * q.buy : tl / q.sell) : null;

  return (
    <div className="rounded-card border border-line bg-surface p-5">
      <p className="mb-4 text-caption font-semibold uppercase text-ink-2">Hesaplayıcı</p>
      <label className="block text-small text-muted">{reverse ? `Miktar (${unit})` : "Tutar (₺)"}</label>
      <input
        type="number"
        inputMode="decimal"
        value={tl}
        min={0}
        onChange={(e) => setTl(Number(e.target.value) || 0)}
        className="num mt-1 w-full rounded-xl border border-line bg-bg px-4 py-3 text-h3 outline-none focus:border-gold"
      />
      <div className="my-3 flex items-center gap-3">
        <select value={key} onChange={(e) => setKey(e.target.value as QuoteKey)} className="flex-1 rounded-xl border border-line bg-bg px-3 py-2.5 text-small outline-none focus:border-gold">
          {OPTIONS.map((o) => <option key={o} value={o}>{QUOTE_META[o].label}</option>)}
        </select>
        <button onClick={() => setReverse((r) => !r)} className="grid size-10 place-items-center rounded-xl border border-line text-gold hover:border-gold" aria-label="Yönü değiştir">
          <ArrowDownUp className="size-4" />
        </button>
      </div>
      <div className="rounded-xl bg-bg p-4">
        <p className="text-small text-muted">{reverse ? "Bugünkü değeri (alış)" : `Alabileceğiniz ${unit}`}</p>
        <p className="num mt-1 text-price-lg text-gold-hi">{result == null ? "—" : reverse ? fmtTL(result) : fmtNum(result)}</p>
      </div>
    </div>
  );
}
